// Dependencies
import { buildImageUrl, setConfig } from 'cloudinary-build-url';
import { Command } from 'commander';
import * as crypto from 'crypto';
import { config } from 'dotenv';
import * as fs from 'fs';
import * as fsp from 'fs/promises';
import { bundleMDX } from 'mdx-bundler';
import fetch from 'node-fetch';
import * as path from 'path';
import * as React from 'react';
import { getMDXComponent } from 'mdx-bundler/client/index.js';
import { renderToString } from 'react-dom/server.js';
import calculateReadingTime from 'reading-time';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeCodeTitles from 'rehype-code-titles';
import rehypeImageLazyLoading from 'rehype-plugin-image-native-lazy-loading';
import rehypePrism from 'rehype-prism-plus';
import rehypeProbeImageSize from 'rehype-probe-image-size';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import remarkHint from 'remark-hint';
import remarkOembed from 'remark-oembed';

// Internals
import { mdxComponents } from './mdx-components.mjs';

setConfig({
  cloudName: 'danestves',
});

async function getBlurDataUrl(cloudinaryId) {
  const imageURL = buildImageUrl(cloudinaryId, {
    transformations: {
      resize: { width: 100 },
      quality: 'auto',
      format: 'webp',
      effect: {
        name: 'blur',
        value: '1000',
      },
    },
  });
  const dataUrl = await getDataUrlForImage(imageURL);
  return dataUrl;
}

async function getDataUrlForImage(imageUrl) {
  const res = await fetch(imageUrl);
  const arrayBuffer = await res.arrayBuffer();
  const base64 = Buffer.from(arrayBuffer).toString('base64');
  const mime = res.headers.get('Content-Type') ?? 'image/webp';
  const dataUrl = `data:${mime};base64,${base64}`;
  return dataUrl;
}

function removePreContainerDivs() {
  return async function preContainerDivsTransformer(tree) {
    const { visit } = await import('unist-util-visit');
    visit(
      tree,
      { type: 'element', tagName: 'pre' },
      function visitor(node, index, parent) {
        if (parent?.type !== 'element') return;
        if (parent.tagName !== 'div') return;
        if (parent.children.length !== 1 && index === 0) return;
        Object.assign(parent, node);
      }
    );
  };
}

(async function () {
  config();
  const program = new Command();
  program
    .requiredOption(
      '-R, --root <path>',
      'Root path (content is relative to root'
    )
    .option('-f, --file [files...]', 'Files to compile')
    .option('-j, --json', 'Output JSON');

  program.parse(process.argv);
  const options = program.opts();
  if (!process.env.DOMAIN) {
    console.error('missing DOMAIN');
    process.exit(1);
  }

  const rootPath = options.root;
  const mdxPaths = options.file;
  const results = {};
  let hasError = false;
  const processed = {};
  const seriesList = {};
  for (let mdxPath of mdxPaths) {
    console.error(`Compiling ${mdxPath}...`);
    const fullPath = path.join(rootPath, mdxPath);
    if (processed[mdxPath]) continue;
    processed[mdxPath] = true;

    const parts = mdxPath.split('/');
    const slug = parts.slice(1).join('/').replace('.mdx', '');
    let series = undefined;
    if (parts.length > 3) {
      const seriesPath = path.join(parts.slice(0, 3).join('/'), '_series.mdx');
      if (
        !seriesList[seriesPath] &&
        fs.existsSync(path.join(rootPath, seriesPath))
      ) {
        seriesList[seriesPath] = parseSeries(path.join(rootPath, seriesPath));
      }
      series = seriesList[seriesPath];
    }

    let mdxSource = '';
    let files = {};
    if ((await fsp.lstat(fullPath)).isDirectory()) {
      mdxSource = await fsp.readFile(`${fullPath}/index.mdx`, 'utf8');
      const mdxFiles = (await fsp.readdir(fullPath)).filter(
        (filename) => filename !== 'index.mdx'
      );
      const results = await Promise.all(
        mdxFiles.map(async (filename) =>
          fsp.readFile(`${fullPath}/${filename}`, 'utf8')
        )
      );
      files = Object.fromEntries(
        results.map((content, i) => [`./${mdxFiles[i]}`, content])
      );
    } else {
      mdxSource = await fsp.readFile(fullPath, 'utf8');
    }
    const { frontmatter, code } = await bundleMDX({
      source: mdxSource,
      files,
      xdmOptions(options) {
        options.remarkPlugins = [
          ...(options.remarkPlugins ?? []),
          remarkGfm,
          remarkHint,
          remarkOembed,
        ];
        options.rehypePlugins = [
          ...(options.rehypePlugins ?? []),
          rehypeImageLazyLoading,
          rehypeProbeImageSize,
          rehypeSlug,
          [rehypeAutolinkHeadings, { behavior: 'wrap' }],
          rehypeCodeTitles,
          [
            rehypePrism,
            {
              showLineNumbers: true,
            },
          ],
          removePreContainerDivs,
        ];
        return options;
      },
    });
    const blurCover = await getBlurDataUrl(frontmatter.cover.id);
    const readingTime = calculateReadingTime(mdxSource);
    const Component = getMDXComponent(code);
    const html = renderToString(
      React.createElement(Component, {
        components: {
          ...mdxComponents,
        },
      })
    );

    const hash = crypto
      .createHash('sha256')
      .update(frontmatter + code)
      .digest('hex');

    const response = await fetch(`${process.env.DOMAIN}/action/post-content`, {
      method: 'post',
      body: JSON.stringify({
        // Used to save the post inside the correct URL
        kv_slug: slug,
        // Plain URL without the rest of the src
        slug: parts[parts.length - 1].replace('.mdx', ''),
        hash,
        frontmatter: {
          ...frontmatter,
          cover: {
            ...frontmatter.cover,
            blur: blurCover,
          },
        },
        series,
        html,
        code,
        readingTime,
      }),
      headers: {
        authorization: `Bearer ${process.env.POST_CONTENT_BEARER_TOKEN}`,
      },
    });
    if (!response.ok) {
      const body = await response.text();
      results[mdxPath] = {
        status: response.status,
        statusText: response.statusText,
        body,
      };
      hasError = true;
    }
    results[mdxPath] = {
      status: response.status,
      statusText: response.statusText,
      slug,
      hash,
    };
  }
  if (options.json) {
    console.log(JSON.stringify(results, null, 2));
  }
  process.exit(hasError ? 1 : 0);
})();

function parseSeries(path) {
  const file = fs.readFileSync(path, 'utf8');
  const slug = path.substring(
    path.indexOf('content/') + 8,
    path.indexOf('_series') - 1
  );
  const lines = file.split('\n');
  const frontmatter = {};
  const filelist = [];
  let state = 'START';
  for (let line of lines) {
    line = line.trim();
    if (!line || line.startsWith('#')) continue;
    if (state === 'START') {
      if (line.startsWith('---')) {
        state = 'FRONTMATTER';
      }
    } else if (state === 'FRONTMATTER') {
      if (line.startsWith('---')) {
        state = 'CONTENT';
      } else {
        const { name, value } = parseLine(line);
        frontmatter[name] = value;
      }
    } else if (state === 'CONTENT') {
      if (line.startsWith('---')) {
        state = 'END';
      }
      filelist.push(line);
    }
  }
  return { slug, frontmatter, filelist };
}

function parseLine(line) {
  const parts = line.split(':');
  const name = parts[0].trim();
  const value = parts[1].trim();
  return { name, value };
}
