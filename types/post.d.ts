export interface Post {
  slug: string;
  hash: string;
  frontmatter: PostFrontmatter;
  html: string;
  readingTime: PostReadingTime;
  code: string;
}

export interface PostFrontmatter {
  title: string;
  cover: PostCover;
  published_at: string;
  tags: string[];
  seo: PostSEO;
}

export interface PostCover {
  id: string;
  alt: string;
}

export interface PostSEO {
  title: string;
  description: string;
}

export interface PostReadingTime {
  text: string;
  minutes: number;
  time: number;
  words: number;
}
