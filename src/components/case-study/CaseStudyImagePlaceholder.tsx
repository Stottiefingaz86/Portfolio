import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';

type CaseStudyImageVariant = 'tile' | 'cover' | 'hero';

const variantClassNames: Record<CaseStudyImageVariant, string> = {
  tile: 'case-study-image-placeholder--tile aspect-[4/3] w-full',
  cover: 'case-study-image-placeholder--cover aspect-[4/3] w-full',
  hero: 'case-study-image-placeholder--hero absolute inset-0',
};

export function CaseStudyImagePlaceholder({
  variant = 'tile',
  className,
}: {
  variant?: CaseStudyImageVariant;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'case-study-image-placeholder relative overflow-hidden bg-muted/20',
        variantClassNames[variant],
        className,
      )}
      aria-hidden
    >
      <Skeleton className="absolute inset-0 rounded-none bg-muted/55" />
      <div className="case-study-image-placeholder-grid absolute inset-0 opacity-35" />

      {variant === 'hero' ? (
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(10_10_10_/_0.12),rgb(10_10_10_/_0.55))]" />
      ) : null}
    </div>
  );
}
