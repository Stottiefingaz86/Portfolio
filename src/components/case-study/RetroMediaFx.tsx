import { cn } from '@/lib/utils';

export function RetroMediaFx({ className }: { className?: string }) {
  return (
    <>
      <span className={cn('case-media-fx__grain', className)} aria-hidden />
      <span className={cn('case-media-fx__scanlines', className)} aria-hidden />
      <span className={cn('case-media-fx__roll-band', className)} aria-hidden />
      <span className={cn('case-media-fx__tear', className)} aria-hidden />
    </>
  );
}
