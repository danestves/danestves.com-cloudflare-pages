import { MdxRemote } from 'next-mdx-remote/types'
import { NodeRelationships } from 'next-mdx'

// @types
import { Asset as GraphCmsAsset } from '@/generated/graphql'

export interface Repository {
  id: number
  node_id: string
  name: string
  full_name: string
  private: boolean
  owner: {
    login: string
  }
  html_url: string
  description: string
  fork: true
  url: string
  forks_url: string
  keys_url: string
  collaborators_url: string
  teams_url: string
  hooks_url: string
  issue_events_url: string
  events_url: string
  assignees_url: string
  branches_url: string
  tags_url: string
  blobs_url: string
  git_tags_url: string
  git_refs_url: string
  trees_url: string
  statuses_url: string
  languages_url: string
  stargazers_url: string
  contributors_url: string
  subscribers_url: string
  subscription_url: string
  commits_url: string
  git_commits_url: string
  comments_url: string
  issue_comment_url: string
  contents_url: string
  compare_url: string
  merges_url: string
  archive_url: string
  downloads_url: string
  issues_url: string
  pulls_url: string
  milestones_url: string
  notifications_url: string
  labels_url: string
  releases_url: string
  deployments_url: string
  created_at: string
  updated_at: string
  pushed_at: string
  git_url: string
  ssh_url: string
  clone_url: string
  svn_url: string
  homepage: string
  size: number
  stargazers_count: number
  watchers_count: number
  language: string
  has_issues: boolean
  has_projects: boolean
  has_downloads: boolean
  has_wiki: boolean
  has_pages: boolean
  forks_count: number
  mirror_url: string | null
  archived: boolean
  disabled: boolean
  open_issues_count: number
  license: {
    key: string
    name: string
    spdx_id: string
    url: string
    node_id: string
  }
  forks: number
  open_issues: number
  watchers: number
  default_branch: string
}

export interface Asset extends GraphCmsAsset {
  height: number
  width: number
}

export interface FrontMatterPost {
  image: string
  publishedAt: string
  seotitle: string
  summary: string
  title: string
  wordCount: number
}

export interface FrontMatterPortfolio {
  image: string
  industry: string
  og: string
  publishedAt: string
  seotitle: string
  summary: string
  technologies: string[]
  title: string
  url: string
  wordCount: number
}

export interface MDXResult {
  content: string
  filepath: string
  hash: string
  mdx: MdxRemote.Source
  relationships?: NodeRelationships
  slug: string
  url: string
}

export interface Post extends MDXResult {
  frontMatter: FrontMatterPost
}

export interface Portfolio extends MDXResult {
  frontMatter: FrontMatterPortfolio
}
