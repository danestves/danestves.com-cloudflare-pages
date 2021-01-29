// Dependencies
import fs from 'fs'
import matter from 'gray-matter'
import mdxPrism from 'mdx-prism'
import path from 'path'
import renderToString from 'next-mdx-remote/render-to-string'

// Components
import MDXComponents from '@/components/MDXComponents'

const root = process.cwd()

export async function getFiles(type: string): Promise<string[]> {
  return fs.readdirSync(path.join(root, 'src', 'data', type))
}

export async function getFileBySlug(
  type: string,
  slug: string
): Promise<{
  mdxSource: {
    compiledSource: string
    renderedOutput: string
    scope?: Record<string, unknown>
  }
  frontMatter: {
    wordCount: number
    slug: string | null
  }
}> {
  const source = slug
    ? fs.readFileSync(path.join(root, 'src', 'data', type, `${slug}.mdx`), 'utf8')
    : fs.readFileSync(path.join(root, 'src', 'data', `${type}.mdx`), 'utf8')

  const { data, content } = matter(source)
  const mdxSource = await renderToString(content, {
    components: MDXComponents,
    mdxOptions: {
      remarkPlugins: [require('remark-code-titles'), require('@fec/remark-a11y-emoji')],
      rehypePlugins: [require('rehype-slug'), require('rehype-autolink-headings'), mdxPrism],
    },
  })

  return {
    mdxSource,
    frontMatter: {
      wordCount: content.split(/\s+/gu).length,
      slug: slug || null,
      ...data,
    },
  }
}

export async function getAllFilesFrontMatter(type: string): Promise<any> {
  const files = fs.readdirSync(path.join(root, 'src', 'data', type))

  return files.reduce((allPosts: any, postSlug: string) => {
    const source = fs.readFileSync(path.join(root, 'src', 'data', type, postSlug), 'utf8')
    const { data } = matter(source)

    return [
      {
        ...data,
        slug: postSlug.replace('.mdx', ''),
      },
      ...allPosts,
    ]
  }, [])
}
