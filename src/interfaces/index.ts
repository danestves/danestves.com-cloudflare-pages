export interface Videos {
  videos: VideosI
}

export interface VideosI {
  kind: string
  etag: string
  items?: ItemsEntity[] | null
  pageInfo: PageInfo
}

export interface ItemsEntity {
  kind: string
  etag: string
  id: string
  snippet: Snippet
  statistics: Statistics
}

export interface Snippet {
  publishedAt: string
  channelId: string
  title: string
  description: string
  thumbnails: Thumbnails
  channelTitle: string
  categoryId: string
  liveBroadcastContent: string
  localized: Localized
  defaultAudioLanguage?: string | null
}

export interface Thumbnails {
  default: DefaultOrMediumOrHighOrStandardOrMaxres
  medium: DefaultOrMediumOrHighOrStandardOrMaxres
  high: DefaultOrMediumOrHighOrStandardOrMaxres
  standard: DefaultOrMediumOrHighOrStandardOrMaxres
  maxres: DefaultOrMediumOrHighOrStandardOrMaxres
}

export interface DefaultOrMediumOrHighOrStandardOrMaxres {
  url: string
  width: number
  height: number
}

export interface Localized {
  title: string
  description: string
}

export interface Statistics {
  viewCount: string
  likeCount: string
  dislikeCount: string
  favoriteCount: string
  commentCount: string
}

export interface PageInfo {
  totalResults: number
  resultsPerPage: number
}
