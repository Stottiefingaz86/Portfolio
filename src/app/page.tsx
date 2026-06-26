import { AboutSection } from '@/components/site/AboutSection';
import { CareerPhases } from '@/components/site/CareerPhases';
import { Contact } from '@/components/site/Contact';
import { Expertise } from '@/components/site/Expertise';
import { Footer } from '@/components/site/Footer';
import { Hero } from '@/components/site/Hero';
import { Leadership } from '@/components/site/Leadership';
import { Marquee } from '@/components/site/Marquee';
import { MobileDock } from '@/components/site/MobileDock';
import { SiteNav } from '@/components/site/SiteNav';
import { Work } from '@/components/site/Work';

export default function Home() {
  return (
    <>
      <SiteNav />
      <main className="site-main">
        <Hero />
        <Marquee />
        <CareerPhases />
        <Expertise />
        <Work />
        <Leadership />
        <AboutSection />
        <Contact />
      </main>
      <Footer />
      <MobileDock />
    </>
  );
}
