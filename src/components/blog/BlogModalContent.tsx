import { BlogArticleContent } from '@/components/blog/BlogArticleContent';
import type { BlogPost } from '@/lib/blog-types';

function getHeroImage(post: BlogPost) {
  if (post.heroImage) return post.heroImage;
  const firstImage = post.blocks.find((block) => block.type === 'image');
  return firstImage?.type === 'image' ? firstImage.src : undefined;
}

function getBodyBlocks(post: BlogPost) {
  const heroImage = getHeroImage(post);

  return post.blocks.filter(
    (block) => !(block.type === 'image' && block.src === heroImage),
  );
}

export function BlogModalContent({ post, index }: { post: BlogPost; index: number }) {
  return (
    <article className="blog-modal-article">
      <header className="blog-modal-article__head">
        <p className="blog-modal-article__meta">
          {String(index + 1).padStart(2, '0')} · {post.tag} · {post.date} · {post.readTime}
        </p>
        <h1 className="blog-modal-article__title">{post.title}</h1>
        <p className="blog-modal-article__lead">{post.excerpt}</p>
      </header>

      <div className="blog-modal-article__body">
        <BlogArticleContent blocks={getBodyBlocks(post)} variant="modal" />
      </div>
    </article>
  );
}
