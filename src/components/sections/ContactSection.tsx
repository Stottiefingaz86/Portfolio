'use client';

import { Link001 } from '@/components/ui/skiper-ui/skiper40';
import { SITE } from '@/lib/portfolio-data';

export function ContactSection() {
  return (
    <section id="contact" className="relative section-y invert-section site-pad">
      <p className="type-label text-white/50">Contact</p>
      <h2 className="type-mega mt-6 text-white md:mt-8">
        Let&apos;s talk
        <br />
        about what&apos;s next.
      </h2>
      <p className="type-body-light mt-10 max-w-lg">
        I&apos;m open to Head of Design, Design Director, Creative Director and senior product
        design leadership opportunities across online gambling, digital product and AI-powered
        customer experience.
      </p>

      <div className="mt-14 flex flex-col gap-8 sm:flex-row sm:flex-wrap sm:items-center sm:gap-12">
        <Link001
          href="#contact"
          className="type-title text-[clamp(1.5rem,4vw,2.5rem)] text-white"
        >
          Contact form
        </Link001>
        <Link001
          href={SITE.linkedin}
          className="type-title text-[clamp(1.5rem,4vw,2.5rem)] text-white"
        >
          LinkedIn
        </Link001>
      </div>
    </section>
  );
}
