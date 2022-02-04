interface Videos {
  kind: string;
  etag: string;
  items?: ItemsEntity[] | null;
  pageInfo: PageInfo;
}

interface ItemsEntity {
  kind: string;
  etag: string;
  id: string;
  snippet: Snippet;
  statistics: Statistics;
}

interface Snippet {
  publishedAt: string;
  channelId: string;
  title: string;
  description: string;
  thumbnails: Thumbnails;
  channelTitle: string;
  categoryId: string;
  liveBroadcastContent: string;
  localized: Localized;
  defaultAudioLanguage?: string | null;
}

interface Thumbnails {
  default: DefaultOrMediumOrHighOrStandardOrMaxres;
  medium: DefaultOrMediumOrHighOrStandardOrMaxres;
  high: DefaultOrMediumOrHighOrStandardOrMaxres;
  standard: DefaultOrMediumOrHighOrStandardOrMaxres;
  maxres: DefaultOrMediumOrHighOrStandardOrMaxres;
}

interface DefaultOrMediumOrHighOrStandardOrMaxres {
  url: string;
  width: number;
  height: number;
}

interface Localized {
  title: string;
  description: string;
}

interface Statistics {
  viewCount: string;
  likeCount: string;
  dislikeCount: string;
  favoriteCount: string;
  commentCount: string;
}

interface PageInfo {
  totalResults: number;
  resultsPerPage: number;
}

export { Videos };
