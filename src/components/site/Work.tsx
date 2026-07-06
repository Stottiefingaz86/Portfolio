'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useCallback, useState } from 'react';

import { CaseStudyModal } from '@/components/case-study/CaseStudyModal';
import { GlitchText } from '@/components/site/hud/GlitchText';
import { HudSectionShell } from '@/components/site/hud/HudSection';
import { WorkCaseStudyGallery } from '@/components/site/WorkCaseStudyGallery';
import { WORK_CASE_STUDIES, type CaseStudy } from '@/lib/portfolio-data';

const EASE = [0.16, 1, 0.3, 1] as const;

export function Work() {
  const reduced = useReducedMotion();
  const [modalStudy, setModalStudy] = useState<CaseStudy | null>(null);

  const modalIndex = modalStudy
    ? WORK_CASE_STUDIES.findIndex((study) => study.id === modalStudy.id)
    : -1;

  const openStudy = useCallback((study: CaseStudy) => {
    setModalStudy(study);
  }, []);

  return (
    <>
      <HudSectionShell id="work" code="SEC_04 // WORK" className="work-section">
        <div className="shell work-shell">
          <div className="work-intro">
            <motion.div
              className="work-intro-inner"
              initial={reduced ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.65, ease: EASE }}
            >
              <p className="section-kicker">Selected work</p>
              <h2 className="work-headline">
                <GlitchText as="span" intensity="elevated">
                  Case studies / Portfolio
                </GlitchText>
              </h2>
              <p className="work-deck">
                Transformation, loyalty, AI and casino — governed product work at scale.
              </p>
            </motion.div>
          </div>

          <WorkCaseStudyGallery onOpen={openStudy} />
        </div>
      </HudSectionShell>

      <CaseStudyModal
        study={modalStudy}
        index={modalIndex}
        onClose={() => setModalStudy(null)}
      />
    </>
  );
}
