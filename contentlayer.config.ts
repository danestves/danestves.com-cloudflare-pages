// Dependencies
import { defineDocumentType, makeSource } from 'contentlayer/source-files'
import type { ComputedFields } from 'contentlayer/source-files'

import readingTime from 'reading-time'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeCodeTitles from 'rehype-code-titles'
import rehypePrism from 'rehype-prism-plus'
import remarkGfm from 'remark-gfm'

const computedFields: ComputedFields = {
  readingTime: { type: 'json', resolve: (doc) => readingTime(doc.body.raw) },
  slug: {
    type: 'string',
    resolve: (doc) => doc._raw.sourceFileName.replace(/\.mdx$/, ''),
  },
  wordCount: {
    type: 'number',
    resolve: (doc) => doc.body.raw.split(/\s+/gu).length,
  },
}

const EnglishPost = defineDocumentType(() => ({
  name: 'EnglishPost',
  filePathPattern: 'posts/en/*.mdx',
  bodyType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    publishedAt: { type: 'string', required: true },
    cover: { type: 'string', required: true },
    seo: {
      type: 'json',
      required: true,
    },
    tags: {
      type: 'list',
      of: {
        type: 'string',
      },
      typeField: 'string',
      required: true,
    },
  },
  computedFields,
}))
const SpanishPost = defineDocumentType(() => ({
  name: 'SpanishPost',
  filePathPattern: 'posts/es/*.mdx',
  bodyType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    publishedAt: { type: 'string', required: true },
    cover: { type: 'string', required: true },
    seo: {
      type: 'json',
      required: true,
    },
    tags: {
      type: 'list',
      of: {
        type: 'string',
      },
      typeField: 'string',
      required: true,
    },
  },
  computedFields,
}))

const contentLayerConfig = makeSource({
  contentDirPath: 'data',
  documentTypes: [EnglishPost, SpanishPost],
  mdx: {
    rehypePlugins: [
      rehypeSlug,
      rehypeCodeTitles,
      [
        rehypePrism,
        {
          showLineNumbers: true,
        },
      ],
      [rehypeAutolinkHeadings, { behavior: 'append' }],
    ],
    remarkPlugins: [remarkGfm],
  },
})

export default contentLayerConfig
