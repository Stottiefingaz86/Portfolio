'use client';

import { useCallback, useState } from 'react';

import { CaseStudyModal } from '@/components/case-study/CaseStudyModal';
import { WorkCaseStudyGallery } from '@/components/site/WorkCaseStudyGallery';
import { BlurFade } from '@/components/ui/blur-fade';
import { WORK_CASE_STUDIES, type CaseStudy } from '@/lib/portfolio-data';

export function Work() {
  const [modalStudy, setModalStudy] = useState<CaseStudy | null>(null);

  const modalIndex = modalStudy
    ? WORK_CASE_STUDIES.findIndex((study) => study.id === modalStudy.id)
    : -1;

  const openStudy = useCallback((study: CaseStudy) => {
    setModalStudy(study);
  }, []);

  return (
    <>
      <section id="work" className="section work-section">
        <div className="shell work-shell">
          <BlurFade inView delay={0.05} className="work-intro">
            <p className="section-kicker">Selected work</p>
            <h2 className="work-headline">Case studies through product maturity.</h2>
            <p className="work-deck">
              Constraints, decisions and outcomes across transformation, research, brand and AI,
              told as stages, not screenshots.
            </p>
          </BlurFade>
        </div>

        <BlurFade inView delay={0.12} className="work-gallery">
          <WorkCaseStudyGallery onOpen={openStudy} />
        </BlurFade>
      </section>

      <CaseStudyModal
        study={modalStudy}
        index={modalIndex}
        onClose={() => setModalStudy(null)}
      />
    </>
  );
}
