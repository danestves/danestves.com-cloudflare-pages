// Dependencies
import remarkA11yEmoji from '@fec/remark-a11y-emoji'
import fs from 'fs'
import matter from 'gray-matter'
import he from 'he'
import { MDXRemote } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import path from 'path'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import remarkCodeTitles from 'remark-code-titles'
import rehypeSlug from 'rehype-slug'
import type { GetStaticProps, NextPage } from 'next'
import type { I18nProps } from 'next-rosetta'

// Internals
import MDXComponents from '@/components/MDXComponents'
import type { MyLocale } from 'i18n'

const UsesPage: NextPage<{ mdx: { compiledSource: string } }> = ({ mdx }) => {
  return (
    <>
      <div className="relative max-w-3xl px-5 py-8 mx-auto">
        <div className="max-w-full prose prose-lg dark:prose-dark">
          <MDXRemote
            compiledSource={mdx.compiledSource}
            components={MDXComponents}
          />
        </div>
      </div>
    </>
  )
}

export const getStaticProps: GetStaticProps<I18nProps<MyLocale>> = async (
  context
) => {
  const locale = context.locale || context.defaultLocale
  const { table = {} } = await import(`i18n/${locale}`)
  const pageFile = path.join('src', 'data', 'uses.mdx')
  const pageSource = fs.readFileSync(pageFile)

  const { content, data } = matter(pageSource)

  return {
    props: {
      table,
      ...data,
      mdx: await serialize(he.decode(content), {
        mdxOptions: {
          remarkPlugins: [remarkCodeTitles, remarkA11yEmoji],
          rehypePlugins: [
            rehypeSlug,
            [rehypeAutolinkHeadings, { behavior: 'append' }],
          ],
        },
      }),
    },
    revalidate: 600,
  }
}

export default UsesPage
