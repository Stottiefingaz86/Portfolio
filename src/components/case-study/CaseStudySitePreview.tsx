'use client';

import { WorkSitePreview } from '@/components/site/WorkSitePreview';
import type { CaseStudy } from '@/lib/portfolio-data';

export function CaseStudySitePreview({
  url,
  title,
  focus,
}: {
  url: string;
  title: string;
  focus?: CaseStudy['previewFocus'];
}) {
  return (
    <div className="case-site-preview">
      <WorkSitePreview url={url} title={title} focus={focus} />
    </div>
  );
}
