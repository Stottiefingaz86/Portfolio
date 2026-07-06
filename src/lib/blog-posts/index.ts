import { hiphopBattleArenaPost } from '@/lib/blog-posts/hiphop-battle-arena';
import type { BlogPost } from '@/lib/blog-types';

export const BLOG_POSTS: BlogPost[] = [hiphopBattleArenaPost];

export function getBlogPostBySlug(slug: string) {
  return BLOG_POSTS.find((post) => post.slug === slug);
}

export function getAllBlogSlugs() {
  return BLOG_POSTS.map((post) => post.slug);
}
