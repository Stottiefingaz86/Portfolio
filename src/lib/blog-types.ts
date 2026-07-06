export interface BlogPostMeta {
  id: string;
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tag: string;
  readTime: string;
  heroImage?: string;
}

export type BlogBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'heading'; level: 2 | 3; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'image'; src: string; alt: string; caption?: string; layout?: 'wide' | 'portrait' | 'photo' }
  | { type: 'video'; youtubeId: string; title?: string; caption?: string }
  | { type: 'callout'; text: string };

export interface BlogPost extends BlogPostMeta {
  blocks: BlogBlock[];
}
