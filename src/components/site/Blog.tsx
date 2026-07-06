'use client';

import { ArrowUpRightIcon } from 'lucide-react';
import Image from 'next/image';
import { useCallback, useState } from 'react';

import { BlogModal } from '@/components/blog/BlogModal';
import { HudSectionShell } from '@/components/site/hud/HudSection';
import { Reveal } from '@/components/site/Reveal';
import { SectionHeader } from '@/components/site/SectionHeader';
import { useHudHoverLight } from '@/components/site/useHudHoverLight';
import { getBlogPostBySlug } from '@/lib/blog-posts';
import { BLOG, type BlogListItem } from '@/lib/portfolio-data';

function BlogRow({
  post,
  index,
  onOpen,
}: {
  post: BlogListItem;
  index: number;
  onOpen: (slug: string) => void;
}) {
  const hoverLight = useHudHoverLight();

  return (
    <li className="blog-row">
      <Reveal delay={index * 0.05}>
        <button
          type="button"
          className="blog-row__inner hud-hover-surface"
          onClick={() => onOpen(post.slug)}
          onPointerMove={hoverLight.onPointerMove}
          onPointerLeave={hoverLight.onPointerLeave}
          aria-label={`Read blog post: ${post.title}`}
        >
          <span className="hud-hover-light" aria-hidden />
          <span className="blog-row__index">{String(index + 1).padStart(2, '0')}</span>

          <span className="blog-row__thumb">
            {post.heroImage ? (
              <Image
                src={post.heroImage}
                alt=""
                fill
                className="blog-row__thumb-image"
                sizes="(min-width: 768px) 92px, 76px"
              />
            ) : (
              <span className="blog-row__thumb-fallback" aria-hidden />
            )}
          </span>

          <span className="blog-row__main">
            <span className="blog-row__meta">
              <span className="blog-row__tag">{post.tag}</span>
              <span className="blog-row__date">{post.date}</span>
            </span>
            <span className="blog-row__title">{post.title}</span>
            <span className="blog-row__excerpt">{post.excerpt}</span>
          </span>

          <span className="blog-row__aside">
            <span className="blog-row__read-time">{post.readTime}</span>
            <ArrowUpRightIcon className="blog-row__arrow" aria-hidden />
          </span>
        </button>
      </Reveal>
    </li>
  );
}

export function Blog() {
  const [modalSlug, setModalSlug] = useState<string | null>(null);
  const modalPost = modalSlug ? getBlogPostBySlug(modalSlug) ?? null : null;
  const modalIndex = modalPost
    ? BLOG.posts.findIndex((post) => post.slug === modalPost.slug)
    : -1;

  const openPost = useCallback((slug: string) => {
    setModalSlug(slug);
  }, []);

  return (
    <>
      <HudSectionShell id="blog" code="SEC_08 // BLOG" className="blog-section">
        <div className="shell blog-shell">
          <SectionHeader kicker={BLOG.kicker} title={BLOG.title} lead={BLOG.lead} />

          <ol className="blog-list">
            {BLOG.posts.map((post, index) => (
              <BlogRow key={post.id} post={post} index={index} onOpen={openPost} />
            ))}
          </ol>
        </div>
      </HudSectionShell>

      <BlogModal
        post={modalPost}
        index={Math.max(modalIndex, 0)}
        onClose={() => setModalSlug(null)}
      />
    </>
  );
}
