import type { Metadata, Viewport } from 'next';

import '@fontsource-variable/geist';
import '@fontsource-variable/jetbrains-mono';
import '@fontsource-variable/bricolage-grotesque';

import { SmoothScroll } from '@/components/portfolio/SmoothScroll';
import { ChrisAgentWidget } from '@/components/site/ChrisAgentWidget';
import { ScrollGuard } from '@/components/site/ScrollGuard';
import { SiteCursor } from '@/components/site/SiteCursor';
import { SiteSounds } from '@/components/site/SiteSounds';
import { TooltipProvider } from '@/components/ui/tooltip';
import { SEO } from '@/lib/portfolio-data';

import './globals.css';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export const metadata: Metadata = {
  title: SEO.title,
  description: SEO.description,
  keywords: [...SEO.keywords],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="site-canvas min-h-full">
        <TooltipProvider>
          <ScrollGuard />
          <SiteCursor />
          <SiteSounds />
          <ChrisAgentWidget />
          <SmoothScroll>{children}</SmoothScroll>
        </TooltipProvider>
      </body>
    </html>
  );
}
