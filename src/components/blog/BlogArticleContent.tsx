import Image from 'next/image';

import type { BlogBlock } from '@/lib/blog-types';
import { cn } from '@/lib/utils';

function RichText({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);

  return (
    <>
      {parts.map((part, index) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={index}>{part.slice(2, -2)}</strong>;
        }

        return part;
      })}
    </>
  );
}

function BlogBlockView({ block }: { block: BlogBlock }) {
  switch (block.type) {
    case 'paragraph':
      return (
        <p className="blog-article__paragraph">
          <RichText text={block.text} />
        </p>
      );

    case 'heading':
      if (block.level === 3) {
        return <h3 className="blog-article__heading blog-article__heading--sub">{block.text}</h3>;
      }

      return <h2 className="blog-article__heading">{block.text}</h2>;

    case 'list':
      return (
        <ul className="blog-article__list">
          {block.items.map((item) => (
            <li key={item}>
              <RichText text={item} />
            </li>
          ))}
        </ul>
      );

    case 'callout':
      return <p className="blog-article__callout">{block.text}</p>;

    case 'image':
      return (
        <figure
          className={cn(
            'blog-article__figure',
            block.layout === 'portrait' && 'blog-article__figure--portrait',
            block.layout === 'photo' && 'blog-article__figure--photo',
            block.layout === 'wide' && 'blog-article__figure--wide',
          )}
        >
          <div className="blog-article__figure-frame">
            <Image
              src={block.src}
              alt={block.alt}
              fill
              className="blog-article__figure-image"
              sizes="(min-width: 900px) 640px, 100vw"
            />
          </div>
          {block.caption ? (
            <figcaption className="blog-article__caption">{block.caption}</figcaption>
          ) : null}
        </figure>
      );

    default:
      return null;
  }
}

export function BlogArticleContent({
  blocks,
  variant = 'page',
}: {
  blocks: BlogBlock[];
  variant?: 'page' | 'modal';
}) {
  return (
    <div className={cn('blog-article__body', variant === 'modal' && 'blog-article__body--modal')}>
      {blocks.map((block, index) => (
        <BlogBlockView key={`${block.type}-${index}`} block={block} />
      ))}
    </div>
  );
}
