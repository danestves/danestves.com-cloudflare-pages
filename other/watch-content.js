// Dependencies
const chokidar = require('chokidar');
const fs = require('fs');
const exec = require('util').promisify(require('child_process').exec);

const cacheFilePath = './content/.cache.json';
const force = true;

(async function () {
  await main();
})();

async function main() {
  // read from cache
  let cache = {};
  if (fs.existsSync(cacheFilePath)) {
    cache = JSON.parse(fs.readFileSync(cacheFilePath));
  }
  try {
    chokidar.watch('./content').on('all', async (event, path) => {
      if (event === 'addDir') return;

      const { match, dir, file } = validContentPath(path);
      if (!match) return;

      console.log({ event, path, dir, file });
      const lastModified = fs.statSync(path).mtimeMs;
      // check for changes
      if (!force && cache[path] && cache[path] === lastModified) {
        console.log(`${path} has not changed`);
        return;
      }

      if (file === '_series.mdx') {
        const { frontmatter, filelist } = await parseSeries(path);
        console.log({ frontmatter, filelist });
        updateCache(cache, dir, {
          type: 'series',
          frontmatter,
          filelist,
          lastModified,
        });
        return;
      }

      const parts = dir.split('/');
      let series = undefined;
      if (parts.length >= 3) {
        series = parts.slice(0, 3).join('/');
        if (cache[series]?.type === 'series') {
          console.log(`Part of series ${series}`);
        }
        if (file === 'index.mdx') {
          path = dir; // just compile the directory
        }
      }

      console.log(`compling ${path}`);
      const results = await doCompile(path);
      const { hash } = results[path];
      console.log(results);
      updateCache(cache, path, {
        series,
        lastModified,
        hash,
      });
    });
  } catch (e) {
    console.error(e);
  }
}

function updateCache(cache, path, entry) {
  cache[path] = entry;
  fs.writeFileSync(cacheFilePath, JSON.stringify(cache, null, 2));
}

async function doCompile(path) {
  console.log(`🛠 Compiling ${path}...`);
  const command = `cd other/mdx && node compile-mdx.mjs --root ../.. --json --file ${path}`;
  let out = await exec(command).catch((e) => {
    console.error(e);
  });
  return JSON.parse(out.stdout);
}

function validContentPath(contentPath) {
  const match = /\/?(?<dir>content\/(?:.*))\/(?<file>[^.]+\.mdx)$/gm.exec(
    contentPath
  );
  if (!match) return { match: false };
  const { dir, file } = match.groups;
  return { match: true, dir, file };
}

function parseSeries(path) {
  const file = fs.readFileSync(path, 'utf8');
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
  return { frontmatter, filelist };
}

function parseLine(line) {
  const parts = line.split(':');
  const name = parts[0].trim();
  const value = parts[1].trim();
  return { name, value };
}
