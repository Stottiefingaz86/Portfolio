import { AboutSection } from '@/components/site/AboutSection';
import { Blog } from '@/components/site/Blog';
import { CareerPhases } from '@/components/site/CareerPhases';
import { Contact } from '@/components/site/Contact';
import { Expertise } from '@/components/site/Expertise';
import { Footer } from '@/components/site/Footer';
import { Hero } from '@/components/site/Hero';
import { Leadership } from '@/components/site/Leadership';
import { MobileDock } from '@/components/site/MobileDock';
import { Testimonials } from '@/components/site/Testimonials';
import { SiteNav } from '@/components/site/SiteNav';
import { Work } from '@/components/site/Work';

export default function Home() {
  return (
    <>
      <SiteNav />
      <main className="site-main site-main--hud">
        <Hero />
        <CareerPhases />
        <Expertise />
        <Work />
        <Leadership />
        <Testimonials />
        <AboutSection />
        <Blog />
        <Contact />
      </main>
      <Footer />
      <MobileDock />
    </>
  );
}
