import type { Rank, Suit } from '@/game/domain/card';

export type StrengthId =
  | 'gambling-ux'
  | 'design-leadership'
  | 'ai-founder'
  | 'design-systems'
  | 'product-strategy'
  | 'player-research';

export interface Strength {
  id: StrengthId;
  title: string;
  shortLabel: string;
  proof: string;
  rank: Rank;
  suit: Suit;
  value: number;
}

export interface CaseStudyStage {
  title: string;
  items: string[];
}

export interface CaseStudyImage {
  src: string;
  alt?: string;
  caption?: string;
  group?: string;
  span?: 'standard' | 'wide';
}

export interface CaseStudyLink {
  label: string;
  href: string;
  external?: boolean;
}

export interface CaseStudy {
  id: string;
  title: string;
  subtitle?: string;
  client: string;
  scope: string;
  outcome: string;
  summary: string;
  tags: string[];
  category: string;
  image: string;
  tileImage?: string;
  bannerImage?: string;
  gallery?: CaseStudyImage[];
  links?: CaseStudyLink[];
  previewUrl?: string;
  previewLabel?: string;
  previewFocus?: 'vip-hub';
  imageFit?: 'cover' | 'contain';
  imagePosition?: 'top' | 'center';
  bannerImageFit?: 'cover' | 'contain';
  document?: string;
  documentLabel?: string;
  context: string;
  problem: string;
  myRole: string;
  whatChanged: string;
  decisions: string;
  impact: string;
  leadership: string;
  stages?: CaseStudyStage[];
}

export interface GalleryItem {
  id: string;
  title: string;
  project: string;
  category: string;
  image?: string;
  aspect: 'square' | 'portrait' | 'landscape';
  kind?: 'image' | 'orb';
}

export interface TimelineEntry {
  id: string;
  phase: string;
  role: string;
  company: string;
  location: string;
  summary: string;
  highlights: string[];
  image: string;
}

export interface ProcessStep {
  id: string;
  phase: string;
  title: string;
  detail: string;
}

export interface AiMilestone {
  id: string;
  phase: string;
  title: string;
  summary: string;
  stack: string[];
}

export interface WhatIBringCard {
  id: string;
  title: string;
  body: string;
  focus: string[];
  stickyIntro: {
    headline: string;
    deck: string;
    callout: string;
  };
}

export const SITE = {
  name: 'Christopher Hunt',
  legalName: 'Christopher Hunt',
  role: 'Head of UI/UX · Creative Director · iGaming Expert',
  roleLines: ['Head of UI/UX.', 'Creative Director.', 'iGaming Expert.'],
  tagline: 'Head of UI/UX · Creative Director · iGaming Expert',
  heroLead:
    'An iGaming product UI/UX expert with 16 years in the industry — designing, modernising and scaling casino, sportsbook, poker, loyalty, rewards retention, payments and player experience.',
  heroLeadMobile:
    '16 years in iGaming. Product UI/UX expert across casino, sportsbook, loyalty, rewards retention and player experience.',
  heroBody:
    '16 years from hands-on game design and UI through product leadership, directing UI/UX teams and design systems — then founding Jurnii.io and building AI-assisted design-to-dev workflows at BetOnline.',
  heroKickerMobile: 'Head of UI/UX / Creative Director / iGaming Expert',
  credibilityLine:
    '16 years in iGaming · VP of UI/UX · BetOnline · Founder of Jurnii.io · Remote from Sotogrande, Spain',
  portfolioYear: '2K26',
  siteLogo: '/logos/sitelogo.png?v=2',
  siteLogoAlt: 'Christopher Hunt monogram',
  lockupLogo: '/logos/lockup-logo.png',
  lockupLogoAlt: 'Christopher Hunt section lockup',
  heroImage: '/images/hero.png?v=8',
  heroImageAlt: 'Cinematic casino horizon with holographic HUD roulette wheel and cyan light pillar',
  subtitle:
    'An iGaming product UI/UX expert with 16 years designing and scaling digital gambling experiences across casino, sportsbook, loyalty, rewards retention and player experience.',
  email: 'hello@christopherhunt.design',
  linkedin: 'https://linkedin.com/in/christopherhunt',
  cv: '/Christopher-Hunt-CV.pdf',
  cvDownloadName: 'Christopher-Hunt-CV.pdf',
  location: 'Sotogrande, Spain',
  portrait: '/about/christopher-hunt.png',
  portraitAlt: 'Christopher Hunt',
} as const;

export const SEO = {
  title: 'Christopher Hunt · VP of UI/UX & Creative Director',
  description:
    'Portfolio of Christopher Hunt — iGaming product UI/UX expert with 16 years across online gambling, casino, sportsbook, poker, design systems and AI-powered customer experience.',
  keywords: [
    'Christopher Hunt',
    'VP of UI UX',
    'Head of UI UX',
    'Creative Director',
    'Design Director',
    'Product Design Leader',
    'iGaming UX',
    'Product UI UX',
    '16 years iGaming',
    'Casino UX',
    'Sportsbook UX',
    'Poker UX',
    'Design Systems',
    'Jurnii AI',
    'Customer Experience',
    'UX Strategy',
    'Online Gambling Design',
  ],
} as const;

export const NAV_SECTIONS = [
  { id: 'journey', label: 'Journey' },
  { id: 'expertise', label: 'Expertise' },
  { id: 'work', label: 'Work' },
  { id: 'leadership', label: 'Leadership' },
  { id: 'testimonials', label: 'Testimonials' },
  { id: 'about', label: 'About' },
  { id: 'blog', label: 'Blog' },
  { id: 'contact', label: 'Contact' },
] as const;

export interface SideNavItem {
  id: string;
  label: string;
  preview: string;
  previewAlt: string;
}

export const SIDE_NAV: SideNavItem[] = [
  { id: 'top', label: 'Intro', preview: '/gallery/bol-casino-hero.png', previewAlt: 'Christopher Hunt' },
  { id: 'journey', label: 'Journey', preview: '/gallery/bol-sportsbook.png', previewAlt: 'Career film' },
  { id: 'bring', label: 'Expertise', preview: '/gallery/bol-vip-hub.png', previewAlt: 'What I bring' },
  { id: 'work', label: 'Work', preview: '/gallery/bol-vip-banner.png', previewAlt: 'Case studies' },
  { id: 'leadership', label: 'Leadership', preview: '/gallery/bol-vip-hub.png', previewAlt: 'Design leadership' },
  { id: 'ai', label: 'AI projects', preview: '/gallery/ringsaway-demo.png', previewAlt: 'AI projects' },
  { id: 'contact', label: 'Contact', preview: '/about/christopher-hunt.png', previewAlt: 'Contact' },
];

export interface CareerPhaseTool {
  id: string;
  name: string;
  logo: string;
}

export interface CareerPhaseCompany {
  name: string;
  year?: string;
  location?: string;
  detail?: string;
  role?: string;
  summary?: string;
}

export interface CareerPhase {
  id: string;
  title: string;
  body: string;
  companies: CareerPhaseCompany[];
  tools: CareerPhaseTool[];
}

export const CAREER_PHASES: CareerPhase[] = [
  {
    id: 'maker',
    title: 'Maker',
    body: 'I started in interactive entertainment, designing iPTV games, Flash banners, slots, casino games, lottery products, animation, UI and sound design.',
    companies: [
      {
        name: 'Digiquest',
        year: '2007',
        location: 'Covent Garden, London',
        role: 'iPTV Games Designer',
        summary:
          'First design role — games and interfaces for TV boxes and iPTV platforms. Early interactive entertainment, remote-control navigation and designing for non-traditional screens.',
      },
      {
        name: 'Spacebar Media',
        year: '2008',
        location: 'Kentish Town, London',
        role: 'Digital Designer · Flash Designer',
        summary:
          'Flash banners and digital campaign assets for brands including Foxy Bingo across multiple regions. Early gambling exposure, motion design and performance-led creative.',
      },
    ],
    tools: [
      { id: 'flash', name: 'Flash', logo: '/logos/flash.svg' },
      { id: 'photoshop', name: 'Photoshop', logo: '/logos/photoshop.svg' },
    ],
  },
  {
    id: 'product-leader',
    title: 'Product Design Leader',
    body: 'I moved into leading design across casino, sportsbook, poker, cashier, authentication, loyalty, back office, My Account, multi-brand journeys and design systems.',
    companies: [
      {
        name: 'St Minver',
        year: '2009',
        location: 'Euro Towers, Gibraltar',
        role: 'Game Designer · UI Designer · Animator',
        summary:
          'Flash slot games plus animation, UI and sound design. Lottery website experiences for Oregon and California — regulated gaming products at platform scale.',
      },
      {
        name: 'Nektan',
        year: '2011–2015',
        location: 'Waterport, Gibraltar',
        role: 'UI/UX Designer · Game Designer',
        summary:
          'HTML5 slots, white-label casino platforms and turnkey gaming. Casino UX for Chomp Casino and a team building exclusive Flash slots for William Hill.',
      },
      {
        name: 'Playtech',
        year: '2015',
        detail: 'Consultant',
        role: 'UI/UX Design Consultant',
        summary:
          'Consulting on Sun Bingo and platform work for Playtech — regulated gambling product design before joining BetOnline full time.',
      },
      {
        name: 'Gala Coral',
        year: '2015',
        location: 'Regal House, Gibraltar',
        role: 'UI/UX Design Consultant',
        summary:
          'Brand and platform design for Coral — keeping product work close to multi-brand gambling experience and regulated market constraints.',
      },
    ],
    tools: [
      { id: 'sketch', name: 'Sketch', logo: '/logos/sketch.svg' },
      { id: 'invision', name: 'InVision', logo: '/logos/invision.svg' },
    ],
  },
  {
    id: 'director',
    title: 'Director',
    body: 'I directed UI/UX teams across multi-brand gambling products — setting standards, design systems, sign-off process and governance at scale, with research keeping player insight in the loop.',
    companies: [
      {
        name: 'Carousel Group',
        year: '2016',
        location: 'Madrid, Spain',
        role: 'Director of UI/UX',
        summary:
          'Directed UI/UX across multi-brand gambling products — team standards, design direction and product experience at group level in Madrid.',
      },
      {
        name: 'Bright Sparks Group',
        year: '2017–2024',
        location: 'Sotogrande, Spain',
        role: 'VP of UI/UX',
        summary:
          'Built and led the design function for BetOnline and offshore brands — casino, sportsbook, poker, cashier, loyalty, research, VoC and a seven-brand design system.',
      },
      {
        name: 'Fosh Tech',
        year: '2025–now',
        location: 'Remote',
        role: 'Design Leadership',
        summary:
          'Continuing product and design leadership across gambling and platform work — systems, governance and AI-assisted design-to-dev workflows.',
      },
    ],
    tools: [
      { id: 'figma', name: 'Figma', logo: '/logos/figma.svg' },
      { id: 'storybook', name: 'Storybook', logo: '/logos/storybook.svg' },
      { id: 'hotjar', name: 'Hotjar', logo: '/logos/hotjar.svg' },
      { id: 'surveys', name: 'Surveys', logo: '/logos/surveys.svg' },
    ],
  },
  {
    id: 'ai-founder',
    title: 'AI Founder',
    body: 'I founded Jurnii AI, an AI-powered customer experience and competitor benchmarking platform for Tier 1 gambling, retail and media brands.',
    companies: [
      {
        name: 'Jurnii Ltd',
        year: '2023–2025',
        detail: 'Exited',
        role: 'Founder',
        summary:
          'Founded Jurnii AI — competitor and CX benchmarking for Tier 1 gambling, retail and media brands. Built a repeatable intelligence platform through to exit.',
      },
    ],
    tools: [
      { id: 'figma', name: 'Figma', logo: '/logos/figma.svg' },
      { id: 'cursor', name: 'Cursor', logo: '/logos/cursor.svg' },
      { id: 'mixpanel', name: 'Mixpanel', logo: '/logos/mixpanel.svg' },
    ],
  },
];

export const CAREER_JOURNEY = {
  title: 'How the work evolved',
  lead: `A career shaped by product maturity — from maker craft to leading teams, directing UI/UX at scale and founding an AI product.`,
  body: `Rather than a list of dates, this is the through-line: how the work matured from interactive entertainment into leading complex gambling products, then directing teams and systems, and finally building AI.`,
  phases: [
    { id: 'maker', label: 'Maker', detail: 'Games, Flash, slots, lottery, animation and UI craft' },
    { id: 'product-leader', label: 'Product Design Leader', detail: 'Casino, sportsbook, poker, cashier, loyalty and multi-brand journeys' },
    { id: 'director', label: 'Director', detail: 'Directing UI/UX teams, design systems and governance at scale' },
    { id: 'ai-founder', label: 'AI Founder', detail: 'Jurnii Ltd — CX intelligence and competitor benchmarking' },
  ],
} as const;

export const DESIGN_LEADERSHIP = {
  title: 'Design leadership',
  intro: `I build design functions that shape product quality across an organisation, not just individual screens.`,
  principles: [
    {
      title: 'Clarity before polish',
      keyword: 'Clarity',
      body: 'I set direction early, remove ambiguity and help teams make better product decisions before execution begins.',
    },
    {
      title: 'Standards that scale',
      keyword: 'Standards',
      body: 'I create governance, critique frameworks and design systems that help multiple brands and verticals ship with consistency.',
    },
    {
      title: 'Evidence over assumption',
      keyword: 'Evidence',
      body: 'I embed customer research, VoC and feedback loops so design has a stronger commercial and product rationale.',
    },
    {
      title: 'Close to engineering',
      keyword: 'Engineering',
      body: 'I work with development leads on handover, adoption and quality. Design only matters when it ships well.',
    },
  ],
  philosophy: {
    lead: 'Design is how a business becomes clearer, faster and easier to trust.',
    body: 'The best design teams do not sit at the end of the process. They shape direction early, challenge assumptions, understand customers and create systems that help the business move faster without losing quality.',
  },
} as const;

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
  company: string;
  context?: string;
}

export const TESTIMONIALS = {
  kicker: 'Testimonials',
  title: 'What collaborators say',
  lead: 'Recommendations from product and design leaders — more coming soon.',
  items: [
    {
      id: 'cyrus-moreno',
      quote:
        'Chris has a great understanding of UI/UX design. He is constantly working on new ideas & thinking outside the box in order to come up with solutions that both resolve design and layout issues and future proof them. I personally worked with Chris on 15 mobile games, I hope to be able to work on more with him in the future.',
      name: 'Cyrus Moreno',
      role: 'iGaming Executive Leader',
      company: 'Product & Casino Strategy',
      context: 'May 2014 · Worked together on the same team',
    },
    {
      id: 'richard-sagman',
      quote:
        'Chris is a top notch creative designer, who can both follow a brief or come up with a unique angle to create something fresh and original. He is able to manage projects independently and also works well within a team. He is great in brainstorms and excels at games, layouts, UX and much more. He was a pleasure to work with and will be missed. I hope to work with Chris again in the future!',
      name: 'Richard Sagman',
      role: 'SVP Product Management',
      company: 'EVERI',
      context: 'May 2014 · Managed Christopher directly',
    },
  ] satisfies Testimonial[],
} as const;

export const GAMBLING_EXPERTISE = {
  title: 'Gambling product expertise',
  intro: `Deep experience inside regulated gambling products, from game interfaces to full multi-brand ecosystems.`,
  verticals: [
    { label: 'Casino', detail: 'Lobbies, game discovery, HTML5 migration and player journeys' },
    { label: 'Sportsbook', detail: 'Betslip architecture, live betting and sports UX' },
    { label: 'Poker', detail: 'Table UX, tournaments and multi-brand poker products' },
    { label: 'Payments', detail: 'Cashier, deposits, withdrawals and authentication flows' },
    { label: 'Loyalty', detail: 'VIP hubs, rewards and retention journeys' },
    { label: 'Back office', detail: 'Internal tools, operations and multi-brand governance' },
  ],
  image: '/gallery/bol-casino-hero.png',
} as const;

export const JURNII_STORY = {
  title: 'Jurnii AI',
  lead: `I founded Jurnii to solve a problem I had experienced first-hand in product and CX work: slow, expensive competitor analysis that rarely gave teams actionable clarity.`,
  jurnii: {
    title: 'Jurnii AI',
    body: `I founded Jurnii AI (jurnii.io) because competitor analysis and CX benchmarking were too slow, too expensive and too disconnected from how product teams actually work.

Traditional reports could cost around £20k and still fail to give teams the clarity they needed. I built a platform where teams enter their URL and competitor URLs, then receive structured analysis across perception, performance, usability and core customer journeys.

Jurnii went on to work with Tier 1 gambling, retail and media brands. More recently, I exited the company after building it into a repeatable CX intelligence platform.`,
  },
  designToDev: {
    title: 'AI-assisted design to dev',
    body: `I'm now focused on how AI helps design and engineering work as one system, not two handoffs.

I'm building out shadcn-based workflows using the Figma MCP, so designers can create live components in Cursor while developers build with governance behind them. The goal is alignment from Figma through to Storybook: one source of truth, consistent components, and less drift between what gets designed and what ships.`,
    pillars: [
      {
        label: 'Figma MCP + Cursor',
        detail: 'Designers generate live, production-ready components directly in the IDE',
      },
      {
        label: 'shadcn foundation',
        detail: 'A shared component layer both design and dev build from',
      },
      {
        label: 'Governed handover',
        detail: 'Developers build with standards, not one-off interpretations of files',
      },
      {
        label: 'Figma → Storybook',
        detail: 'End-to-end alignment so design tokens and components stay in sync',
      },
    ],
  },
} as const;

export const FEATURED_CASE_STUDY_IDS = [
  'betonline-transformation',
  'loyalty-rewards',
  'jurnii-ai',
  'lucky-lagoon',
] as const;

export const ABOUT = {
  title: 'Creative craft. Product depth. Commercial focus.',
  lead: `I'm English and based in Spain, where I've lived for the last 16 years with my family.

My career started in Flash, games and interactive entertainment, which gave me a hands-on foundation in motion, UI, game mechanics and digital craft. Since then, I've seen the gaming and gambling industry change completely, from Flash and early mobile casino products to modern multi-brand platforms, design systems, data-led product decisions and AI-assisted workflows.

That background still shapes how I work today. I care about the craft, but I also care about the system around it: how products are built, how teams collaborate, how players move through complex journeys and how design can help a business make better decisions.

I work closely with tools like Figma, Cursor and Mixpanel, combining design systems, product thinking, data insight and AI experimentation to improve how ideas move from concept to live product.`,
  personalTitle: 'About Me',
  portrait: '/about/christopher-hunt.png',
  portraitAlt: 'Christopher Hunt',
  personal: `Outside of work, I'm a family man, obsessed with padel, music creation and building small products through vibe coding. I like making things, testing ideas quickly and staying close to the tools that are changing how design and development work.`,
  birthDate: '1986-07-13',
  birthDateLabel: '13/07/1986',
  persona: {
    location: 'Remote · Spain',
    focus: 'BetOnline · VP of UI/UX',
    goals: [
      'Build design maturity inside complex gambling organisations',
      'Connect craft, product judgment and commercial outcomes',
      'Ship governed multi-brand systems without losing speed',
    ],
    traits: [
      'Maker background',
      'Multi-brand systems',
      'VoC & research',
      'AI design-to-dev',
    ],
  },
} as const;

import { BLOG_POSTS } from '@/lib/blog-posts';

export interface BlogListItem {
  id: string;
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tag: string;
  readTime: string;
  heroImage?: string;
}

export const BLOG = {
  kicker: 'Blog',
  title: 'Writing & notes',
  lead: 'Stories from the early days of building online — and what they taught me about product, community and craft.',
  posts: BLOG_POSTS.map(({ id, slug, title, date, excerpt, tag, readTime, heroImage }) => ({
    id,
    slug,
    title,
    date,
    excerpt,
    tag,
    readTime,
    heroImage,
  })) satisfies BlogListItem[],
} as const;

export const LEADERSHIP_PHILOSOPHY = {
  title: 'Design is how a business becomes clearer, faster and easier to trust.',
  body: `I believe design leadership is about more than making things look better. It is about creating clarity, setting standards, improving how teams work and helping businesses make better product decisions.

The best design teams do not sit at the end of the process. They shape direction early, challenge assumptions, understand customers, work closely with engineering and create systems that help the business move faster without losing quality.

My approach is direct: understand the player, understand the business goal, remove the friction, create the system and make the experience feel effortless.`,
} as const;

export const TIMELINE: TimelineEntry[] = [
  {
    id: 'betonline',
    phase: 'Product maturity',
    role: 'VP of UI/UX',
    company: 'BetOnline / Offshore Brand Group',
    location: 'Remote · Sotogrande, Spain',
    summary:
      'When I joined BetOnline, design was not yet operating as a mature function. There was no dedicated UI/UX team, no central design system and limited governance across the product estate. Early on, I modernised the casino experience. As the product matured, I expanded across sportsbook, casino, poker, cashier, authentication, loyalty, my account, back office and multi-brand journeys. Over time, I built and led a specialist internal design team, introduced UX research and Voice of Customer practices, worked closely with C-level stakeholders and product heads, and led the creation of an agnostic design system supporting seven brands.',
    highlights: [
      'Built design function from scratch',
      '7-brand design system',
      'VoC & customer research',
    ],
    image: '/gallery/bol-casino-hero.png',
  },
  {
    id: 'jurnii',
    phase: 'AI Founder',
    role: 'Founder',
    company: 'Jurnii AI',
    location: 'Remote',
    summary:
      'I founded Jurnii AI to solve a problem I had experienced first-hand: competitor analysis and CX benchmarking were slow, expensive and often not actionable enough. The platform allowed teams to enter their own URL and competitor URLs, then generated structured analysis across perception, performance, usability and core customer journeys. Jurnii went on to work with major brands including Evoke, Betsson, DAZN, LeoVegas, M&S and multiple offshore operators. More recently, I exited after building a repeatable CX intelligence platform.',
    highlights: ['AI-powered CX intelligence', 'Tier 1 clients', 'Founder exit'],
    image: '/gallery/bol-casino-hero.png',
  },
  {
    id: 'playtech-coral',
    phase: 'Consulting',
    role: 'UI/UX Design Consultant',
    company: 'Playtech · Coral',
    location: 'Europe',
    summary:
      'After Busslr, I consulted as a designer for Playtech on Sun Bingo and for Coral, doing platform and brand work that kept me close to regulated gambling product design before I joined BetOnline.',
    highlights: ['Playtech', 'Sun Bingo', 'Coral'],
    image: '/gallery/bol-casino.png',
  },
  {
    id: 'busslr',
    phase: 'Founder',
    role: 'Creative Director · UI/UX Designer',
    company: 'Busslr',
    location: 'Europe',
    summary:
      'Busslr was my major venture outside gambling. I helped build an events app, raised €1 million and led the creative and product direction. I mapped user journeys, wrote PRDs, shaped the product experience and worked directly with outsourced development teams through to launch.',
    highlights: ['€1M raised', 'Concept to launch', 'Product ownership'],
    image: '/gallery/bol-vip-banner.png',
  },
  {
    id: 'nektan',
    phase: 'Platform design',
    role: 'UI/UX Designer · Game Designer',
    company: 'Nektan',
    location: 'UK',
    summary:
      'At Nektan, I worked across HTML5 slots, white-label casino platforms and turnkey gaming solutions. I designed casino experiences and game interfaces for brands including Chomp Casino, and led a team building exclusive Flash slot games for William Hill. This role moved me further into product experience, platform thinking and design leadership.',
    highlights: ['White-label platforms', 'William Hill slots', 'HTML5 gaming'],
    image: '/gallery/bol-casino.png',
  },
  {
    id: 'st-minver',
    phase: 'Maker',
    role: 'Game Designer · UI Designer · Animator',
    company: 'St Minver / GTECH G2',
    location: 'UK',
    summary:
      'At St Minver / GTECH G2, I built Flash slot games and worked across game design, animation, UI and sound design. I also worked on lottery website experiences for Oregon Lottery and California Lottery, creating digital gaming and lottery products for regulated markets.',
    highlights: ['Flash slot games', 'Lottery UX', 'Animation & sound'],
    image: '/case-studies/lucky-lagoon-mascot.png',
  },
  {
    id: 'spacebar',
    phase: 'Early craft',
    role: 'Digital Designer · Flash Designer',
    company: 'Spacebar Media',
    location: 'London, UK',
    summary:
      'After DigiQuest, I worked at Spacebar Media in London, creating Flash banners and digital campaign assets for brands including Foxy Bingo across multiple regions. This gave me early experience in online gambling, campaign performance, motion and attention-led design.',
    highlights: ['Foxy Bingo', 'Flash campaigns', 'Multi-region assets'],
    image: '/frootjarz/LOGO.png',
  },
  {
    id: 'digiquest',
    phase: 'Starting point',
    role: 'iPTV Games Designer',
    company: 'DigiQuest',
    location: 'UK',
    summary:
      'I started my career at DigiQuest, designing games and user interfaces for TV boxes and iPTV platforms. This gave me my first real experience in interactive entertainment, game interfaces, remote-control navigation and designing products for non-traditional devices.',
    highlights: ['iPTV games', 'TV box UX', 'Interactive entertainment'],
    image: '/frootjarz/symbols/s1.png',
  },
];

export const GALLERY: GalleryItem[] = [
  {
    id: 'bol-betslip',
    title: 'Betslip',
    project: 'BetOnline',
    category: 'Sportsbook',
    image: '/gallery/bol-sportsbook.png',
    aspect: 'portrait',
  },
  {
    id: 'bol-vip',
    title: 'VIP Hub',
    project: 'BetOnline',
    category: 'Loyalty',
    image: '/gallery/bol-vip-hub.png',
    aspect: 'portrait',
  },
  {
    id: 'bol-casino',
    title: 'Casino',
    project: 'BetOnline',
    category: 'Casino',
    image: '/gallery/bol-casino.png',
    aspect: 'portrait',
  },
  {
    id: 'lucky-lagoon-mobile',
    title: 'Mobile product',
    project: 'Lucky Lagoon',
    category: 'Brand',
    image: '/case-studies/lucky-lagoon-mobile.png',
    aspect: 'landscape',
  },
  {
    id: 'lucky-lagoon-mascot',
    title: 'Lucky mascot',
    project: 'Lucky Lagoon',
    category: 'Brand',
    image: '/case-studies/lucky-lagoon-mascot.png',
    aspect: 'landscape',
  },
];

export const AI_MILESTONES: AiMilestone[] = [
  {
    id: 'exit',
    phase: 'More recently',
    title: 'Jurnii AI · Exit',
    summary:
      'I exited Jurnii AI after building it into a customer experience intelligence platform used by Tier 1 gambling, retail and media brands, turning a slow consultancy-style process into a faster, repeatable insight engine.',
    stack: ['CX benchmarking', 'Journey analysis', 'Review intelligence'],
  },
  {
    id: 'founder',
    phase: 'Founder stage',
    title: 'Jurnii AI · Founder',
    summary:
      'I founded Jurnii to automate competitor analysis and customer experience benchmarking. Users could enter their own URL and competitor URLs, and Jurnii would analyse sites across more than 1,000 heuristics, scoring perception, performance, usability and customer journeys while comparing results against competitors.',
    stack: ['Heuristic scoring', 'Journey analysis', 'Competitor benchmarking'],
  },
  {
    id: 'design-system-ai',
    phase: 'Future direction',
    title: 'AI design-to-dev workflows',
    summary:
      'I\'m building shadcn-based workflows with the Figma MCP so designers can create live components in Cursor, while developers build with governance and keep Figma, code and Storybook aligned.',
    stack: ['Figma MCP', 'shadcn', 'Cursor', 'Storybook'],
  },
];

export const EXPERTISE_TOOLS = [
  { id: 'figma', name: 'Figma', logo: '/logos/figma.svg' },
  { id: 'cursor', name: 'Cursor', logo: '/logos/cursor.svg' },
  { id: 'mixpanel', name: 'Mixpanel', logo: '/logos/mixpanel.svg' },
] as const;

export const WHAT_I_BRING: WhatIBringCard[] = [
  {
    id: 'leadership',
    title: 'Design leadership',
    body: 'I build and lead design teams, set direction, create standards and raise execution quality across complex gambling organisations.',
    focus: ['Teams', 'Standards', 'Design authority'],
    stickyIntro: {
      headline: 'Design leadership at scale.',
      deck: 'Teams, systems and product judgment.',
      callout: 'Teams · Standards · Design authority',
    },
  },
  {
    id: 'gambling',
    title: 'Gambling product depth',
    body: 'Deep understanding of offshore, US and compliance markets — and how casino and loyalty drive revenue across the product estate.',
    focus: ['Offshore & US', 'Compliance', 'Casino & loyalty'],
    stickyIntro: {
      headline: '16 years in gambling product.',
      deck: 'Offshore, US and compliance — casino and loyalty drive revenue.',
      callout: 'Offshore · US · Casino & loyalty',
    },
  },
  {
    id: 'systems',
    title: 'Design systems & governance',
    body: 'I create scalable systems and governance models that improve consistency, speed and collaboration between design and engineering.',
    focus: ['Design systems', 'Sign-off', 'Handover'],
    stickyIntro: {
      headline: 'Systems that scale with the business.',
      deck: 'Governance, sign-off and design-to-dev handover.',
      callout: 'Design systems · Sign-off · Handover',
    },
  },
  {
    id: 'research',
    title: 'UX research & customer voice',
    body: 'I introduce VoC, CSAT, interviews and feedback loops so teams design from real player insight, not internal assumption.',
    focus: ['VoC', 'CSAT', 'Player insight'],
    stickyIntro: {
      headline: 'Player insight in the loop.',
      deck: 'VoC and research before assumptions win.',
      callout: 'VoC · CSAT · Player insight',
    },
  },
  {
    id: 'strategy',
    title: 'Product strategy',
    body: 'I work with CEOs, CPOs and heads of product to shape direction, solve problems and connect design decisions to business outcomes.',
    focus: ['C-level', 'Product direction', 'Outcomes'],
    stickyIntro: {
      headline: 'Product strategy with commercial teeth.',
      deck: 'Direction with C-level and product leadership.',
      callout: 'C-level · Product direction · Outcomes',
    },
  },
  {
    id: 'ai',
    title: 'AI & design-to-dev',
    body: 'I founded Jurnii AI for CX intelligence, and I\'m building AI-assisted workflows with Figma MCP, shadcn and Cursor to align design and dev from Figma through to Storybook.',
    focus: ['Jurnii AI', 'Figma MCP', 'Storybook'],
    stickyIntro: {
      headline: 'AI from design to shipped UI.',
      deck: 'Jurnii, Figma MCP and shadcn in one workflow.',
      callout: 'Jurnii AI · Figma MCP · Storybook',
    },
  },
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'betonline-transformation',
    title: 'BetOnline Product Transformation',
    subtitle: 'From a brand cheatsheet and fragmented verticals to a governed shadcn design system.',
    client: 'BetOnline / Offshore Brand Group',
    scope: 'Multi-vertical · Multi-brand · Design leadership',
    outcome: 'A governed product ecosystem with design as a central function',
    summary:
      'When I joined BetOnline, the product I inherited had no design system, no UI/UX team and no real governance — just a brand cheatsheet while casino, sportsbook, poker and other verticals shipped whatever they wanted. I built the design and UI/UX function, brought the verticals together under one standard, and drove the product toward where it is now: shadcn-based systems, meticulous animation and transition craft, and a stronger focus on performance — with me setting vision and goals alongside tech.',
    tags: ['Transformation', 'Governance', 'Multi-brand'],
    category: 'Leadership',
    image: '/case-studies/betonline-home.png',
    tileImage: '/case-studies/betonline%20cover.png?v=1',
    bannerImage: '/case-studies/betonline%20banner%20case.png?v=2',
    gallery: [
      {
        group: 'Before',
        src: '/case-studies/betonline%29old%201.png',
        alt: 'BetOnline before — inherited sportsbook experience',
        caption: 'Inherited site — sportsbook and product surfaces as I joined',
      },
      {
        group: 'Before',
        src: '/case-studies/betonline%29old%202.png',
        alt: 'BetOnline before — inherited casino experience',
        caption: 'Inherited site — casino and lobby without shared system or governance',
      },
      {
        group: 'After',
        src: '/case-studies/betonline%20new1.png',
        alt: 'BetOnline now — modern homepage direction',
        caption: 'Current direction — unified product vision with design-led execution',
      },
      {
        group: 'After',
        src: '/case-studies/betonline%20new2.png',
        alt: 'BetOnline now — casino and player experience',
        caption: 'Current direction — shadcn system thinking, motion, transition and performance',
      },
    ],
    previewUrl: 'https://bol-seven.vercel.app/',
    previewLabel: 'BetOnline prototype',
    bannerImageFit: 'cover',
    imageFit: 'contain',
    imagePosition: 'top',
    context:
      'When I joined, BetOnline had grown without a mature design function. There was no design system — only a cheatsheet of the brand — and verticals could release whatever they wanted without passing through a central UI/UX function.',
    problem:
      'Players moved through inconsistent journeys. Teams rebuilt patterns in isolation. There was no governance, no shared component language and no design authority connecting casino, sportsbook, poker, cashier, loyalty and account experiences.',
    myRole:
      'As Head of UI/UX and Head of Design, I built the UI/UX team, made everything pass through design, joined the verticals together and set the product vision teams now work toward — alongside tech, with clear goals and standards.',
    whatChanged:
      'It took time, but design moved from reactive support into a central function. We modernised key journeys, introduced governance and sign-off, and are now building toward a shadcn-based design system with stronger animation, transition and performance standards across the estate.',
    decisions:
      'I prioritised bringing verticals under one design standard before scaling surface area. That meant shared components, central review, shadcn as the next system foundation, and being meticulous about motion, transition quality and performance — not just visual polish.',
    impact:
      'Design now operates as a central function with sign-off across the estate. Verticals work to shared standards instead of shipping in isolation, and the product direction reflects a clearer vision — with shadcn systems, motion craft and performance as active goals.',
    leadership:
      'This case study shows I can inherit a fragmented product, build a UI/UX team from scratch, establish governance where none existed, join verticals under one standard and drive long-term product vision alongside engineering — from brand cheatsheet to design-led execution.',
    stages: [
      {
        title: 'What I inherited',
        items: [
          'No design system — only a brand cheatsheet',
          'No UI/UX team or central sign-off',
          'Verticals releasing independently',
          'Inconsistent casino, sportsbook and account journeys',
          'No shared component language',
        ],
      },
      {
        title: 'Building the function',
        items: [
          'Established UI/UX as a central product function',
          'Everything passes through design before release',
          'Joined verticals together under one standard',
          'Built the team and raised the quality bar',
          'Set vision and goals teams now work toward',
        ],
      },
      {
        title: 'Product modernisation',
        items: [
          'Casino and lobby modernisation',
          'Stronger game discovery and hierarchy',
          'Loyalty, rewards and retention-led surfaces',
          'VIP hub and player value journeys',
          'Closer collaboration with product and engineering',
        ],
      },
      {
        title: 'Where we are now',
        items: [
          'shadcn-based design system direction',
          'Meticulous animation and transition craft',
          'Performance as a first-class design concern',
          'Multi-brand governance with shared components',
          'Design and tech driving decisions together',
        ],
      },
    ],
  },
  {
    id: 'loyalty-rewards',
    title: 'Loyalty and Rewards',
    subtitle: 'Gaming has become loyalty and rewards focused for retention.',
    client: 'BetOnline / Offshore Brand Group',
    scope: 'Campaigns · VIP hub · Retention',
    outcome: 'Retention-led journeys with clearer player value',
    summary:
      'As the product matured, the business shifted towards loyalty, rewards and retention. I led design across campaigns, promotion surfaces and the VIP hub, helping players see value more clearly and giving the business stronger tools to keep them coming back.',
    tags: ['Loyalty', 'VIP', 'Retention'],
    category: 'Loyalty',
    image: '/case-studies/vip-hub-drawer.png',
    previewUrl: 'https://bol-seven.vercel.app/casino?vip=true&section=Overview&hubFocus=true',
    previewLabel: 'VIP Hub',
    previewFocus: 'vip-hub',
    context:
      'Gaming has become loyalty and rewards focused for retention. BetOnline needed player-facing surfaces that made rewards feel tangible, not buried in the product.',
    problem:
      'Promotion and loyalty experiences were inconsistent. High-value players did not always get a clear VIP journey, and campaign surfaces did not always connect back to the wider product.',
    myRole:
      'As Head of UI/UX and Head of Design, I set direction for loyalty, rewards and retention-led journeys across campaigns and the VIP hub.',
    whatChanged:
      'I helped shape campaign surfaces, promotion patterns and the VIP hub so reward value was easier to find, understand and act on.',
    decisions:
      'I focused on visibility first: what the player gets, why it matters now, and how it connects to the rest of the product. Campaigns and VIP needed to feel part of one system, not separate add-ons.',
    impact:
      'Gave the business a stronger retention layer in the product, with clearer campaign presentation and a more credible VIP experience for high-value players.',
    leadership:
      'Shows how I connect product design to retention strategy, not just visual polish on isolated promotions.',
  },
  {
    id: 'casino-jackpots',
    title: 'Casino and Jackpots',
    subtitle: 'Immersive interaction for players who want to come back.',
    client: 'BetOnline / Offshore Brand Group',
    scope: 'Casino · Jackpots · Player engagement',
    outcome: 'More immersive casino moments built for repeat play',
    summary:
      'How I helped shape casino and jackpot experiences with more immersion, motion and interaction, giving players reasons to return rather than treating games as static tiles on a page.',
    tags: ['Casino', 'Jackpots', 'Engagement'],
    category: 'Casino',
    image: '/case-studies/casino-jackpots.png',
    context:
      'Casino had moved beyond legacy lobby patterns. The opportunity was to make jackpot and game discovery feel more alive, more memorable and more worth coming back to.',
    problem:
      'Casino surfaces could feel flat. Jackpot moments and game discovery did not always create enough tension, delight or reason for players to return.',
    myRole:
      'As Head of UI/UX, I led casino experience direction with a focus on immersion, interaction and repeat engagement around jackpots and game discovery.',
    whatChanged:
      'I pushed for richer casino interaction, stronger jackpot presentation and lobby patterns that felt more like an experience players wanted to re-enter.',
    decisions:
      'I treated jackpots and featured games as product moments, not just content blocks. Motion, hierarchy and interaction needed to build anticipation and make return visits feel natural.',
    impact:
      'Helped modernise how casino and jackpot experiences felt in the product, with a clearer focus on engagement and repeat play.',
    leadership:
      'Shows how my game-design background still shapes product work: I care about the feeling of play, not just the layout around it.',
  },
  {
    id: 'design-governance',
    title: 'Building Design Governance Across Multiple Brands',
    client: 'BetOnline / Offshore Brand Group',
    scope: 'Multi-brand · Governance',
    outcome: 'Stronger standards across seven brands',
    summary:
      'How I established design standards, quality control and stronger product consistency across a multi-brand gambling ecosystem.',
    tags: ['Governance', 'Multi-brand', 'Leadership'],
    category: 'Leadership',
    image: '/gallery/bol-vip-hub.png',
    context:
      'As my role expanded, I became the design authority across multiple brands and verticals, working with C-level stakeholders, heads of product and development leads.',
    problem:
      'Without governance, each brand and vertical was interpreting design differently. Quality, consistency and delivery standards varied widely.',
    myRole:
      'As Head of UI/UX and Head of Design, I set design direction, standards and quality expectations across the product estate.',
    whatChanged:
      'I introduced clearer design governance, critique standards and cross-vertical alignment so teams could ship with more consistency.',
    decisions:
      'I connected design standards to business priorities: not just visual consistency, but clearer product decisions, better handover and stronger accountability.',
    impact:
      'Established a clearer foundation for multi-brand consistency, improved design-to-development collaboration and gave teams shared standards to work from.',
    leadership:
      'Shows how I scale design beyond individual projects into a function that shapes product quality across an organisation.',
  },
  {
    id: 'design-system',
    title: 'Creating a Scalable Gambling Design System',
    client: 'BetOnline / Offshore Brand Group',
    scope: '7 brands · Design system',
    outcome: 'A shared system for multi-brand delivery',
    summary:
      'How I led the development of an agnostic design system used across seven brands, improving consistency, scalability and design-to-development delivery.',
    tags: ['Design Systems', 'Multi-brand', 'Governance'],
    category: 'Systems',
    image: '/gallery/bol-vip-banner.png',
    context:
      'The product estate spanned sportsbook, casino, poker, cashier, authentication, loyalty and back office across multiple live brands with no mature shared system.',
    problem:
      'Teams were rebuilding patterns from scratch. Inconsistency slowed delivery and made cross-brand experiences harder to maintain.',
    myRole:
      'As Head of Design, I led the creation of an agnostic design system and worked with development leads to improve adoption and handover.',
    whatChanged:
      'I built a design system supporting seven brands, improving consistency, scalability, speed and governance across the product estate.',
    decisions:
      'I focused on agnostic components, clear tokens and governance that could support different brands without duplicating work.',
    impact:
      'Gave teams a shared system, reduced fragmentation and created a stronger foundation for design-to-development delivery.',
    leadership:
      'Shows how I turn fragmented product experiences into clearer systems that help teams move faster without losing quality.',
  },
  {
    id: 'customer-voice',
    title: 'Embedding Customer Voice into Product Design',
    client: 'BetOnline / Offshore Brand Group',
    scope: 'UX research · VoC',
    outcome: 'Design grounded in player insight',
    summary:
      'How I introduced VoC reports, customer interviews and CSAT surveys to help teams design from real player feedback.',
    tags: ['Research', 'VoC', 'CSAT'],
    category: 'Research',
    image: '/gallery/bol-sportsbook.png',
    context:
      'Product decisions were often driven by internal assumptions rather than structured customer insight.',
    problem:
      'Teams needed a clearer view of what players actually wanted, not just what stakeholders believed was right.',
    myRole:
      'As Head of UI/UX, I introduced UX strategy through Voice of Customer reports, one-to-one interviews, CSAT surveys and player feedback analysis.',
    whatChanged:
      'I embedded customer feedback loops into the design process so teams could design from real player insight.',
    decisions:
      'I paired qualitative interviews with CSAT data and VoC reporting so insight was repeatable, not one-off.',
    impact:
      'Helped the business move from assumption to customer insight and gave design a stronger evidence base for product decisions.',
    leadership:
      'Shows how I connect design leadership with research practice and commercial decision-making.',
  },
  {
    id: 'lucky-lagoon',
    title: 'Lucky Lagoon: Brand Identity from Zero',
    client: 'Leading gaming company · Jurnii Studio',
    scope: 'Brand book · Visual & verbal identity',
    outcome: 'A market-ready brand foundation for launch',
    summary:
      'How Jurnii Studio partnered with a leading gaming company to create Lucky Lagoon, a complete brand identity, mascot and digital application framework from a blank slate.',
    tags: ['Brand Identity', 'Mascot', 'Brand Book'],
    category: 'Brand',
    image: '/case-studies/lucky-lagoon-thumb.png',
    document: '/case-studies/Lucky Lagoon Brand Book 2025.pdf',
    documentLabel: 'Lucky Lagoon Brand Book',
    context:
      'A leading gaming company was launching Lucky Lagoon as a new venture. They needed an original brand identity from scratch: purpose, values, visual language and messaging, before going to market.',
    problem:
      'There was no defined brand framework. Without clear purpose, tone, visual style or messaging, the team risked launching without differentiation, consistency or a foundation stakeholders could align around.',
    myRole:
      'As Creative Director at Jurnii Studio, I led brand discovery workshops, identity creation and delivery of the complete Brand Book, working with stakeholders and partners through a phased development process.',
    whatChanged:
      'We delivered a comprehensive Brand Book covering brand purpose and values, tone of voice, logo and typography, colour palette, messaging guidelines and practical application examples across website, marketing and social channels.',
    decisions:
      'I structured the work in three phases: discovery and definition, identity creation (visual and verbal), then application guidelines with mockups. We developed Lucky the parrot as the brand mascot, balancing playfulness with professionalism for a tropical, immersive casino experience.',
    impact:
      'The client received a cohesive brand vision with actionable guidelines for every touchpoint. The brand team noted we exceeded the original scope, going deeper on research, engaging partners proactively and delivering a practical, market-ready brand book.',
    leadership:
      'Shows how I take a new venture from undefined to launch-ready, combining strategic narrative, creative direction and structured deliverables that internal teams and external partners can execute against.',
  },
  {
    id: 'jurnii-ai',
    title: 'Founding Jurnii AI',
    client: 'Jurnii AI',
    scope: '0 → 1 · AI platform',
    outcome: 'A faster, repeatable CX intelligence engine',
    summary:
      'How I turned a £20k competitor analysis problem into an AI-powered customer experience and benchmarking platform used by Tier 1 clients.',
    tags: ['AI', 'CX Benchmarking', 'Founder'],
    category: 'AI',
    image: '/case-studies/jurnii_cover.png?v=4',
    tileImage: '/case-studies/jurnii_cover.png?v=4',
    bannerImage: '/case-studies/jurnii_banner.png?v=1',
    gallery: [
      { src: '/case-studies/jurnii_1.png', alt: 'Jurnii AI platform overview' },
      { src: '/case-studies/jurnii%202.png', alt: 'Jurnii competitor benchmarking' },
      { src: '/case-studies/jurnii3.png', alt: 'Jurnii CX intelligence dashboard' },
    ],
    links: [{ label: 'Jurnii.io', href: 'https://jurnii.io', external: true }],
    context:
      'I had experienced first-hand how slow, expensive and limited traditional competitor analysis and CX benchmarking could be.',
    problem:
      'Traditional reports could cost around £20k, take too long to produce and still fail to give product teams the clarity they needed.',
    myRole:
      'As founder, I built Jurnii to automate competitor analysis and customer experience benchmarking.',
    whatChanged:
      'I created a platform where teams could enter their own URL and competitor URLs, then receive structured analysis across perception, performance, usability and core journeys.',
    decisions:
      'I focused on repeatable journey analysis across homepage, sportsbook, placing a bet, help, deposit and withdrawal, plus review scraping for customer perception.',
    impact:
      'Created a repeatable process, supported Tier 1 clients including Evoke, Betsson, DAZN, LeoVegas and M&S, and more recently exited after building Jurnii into a scalable CX intelligence platform.',
    leadership:
      'Shows how I identify real business problems, turn internal pain points into products and operate at founder level.',
  },
];

export const WORK_CASE_STUDY_ORDER = [
  ...FEATURED_CASE_STUDY_IDS,
  'design-system',
  'customer-voice',
  'casino-jackpots',
  'design-governance',
] as const;

export const WORK_CASE_STUDIES = WORK_CASE_STUDY_ORDER.map((id) =>
  CASE_STUDIES.find((study) => study.id === id),
).filter((study): study is CaseStudy => study !== undefined);

export const FEATURED_CASE_STUDIES = FEATURED_CASE_STUDY_IDS.map((id) =>
  CASE_STUDIES.find((study) => study.id === id),
).filter((study): study is CaseStudy => study !== undefined);

export const WORK_FEATURED_CASE_STUDIES = FEATURED_CASE_STUDIES;

export const WORK_TEXT_STACK_CASE_STUDIES = WORK_CASE_STUDIES.filter(
  (study) => !FEATURED_CASE_STUDY_IDS.includes(study.id as (typeof FEATURED_CASE_STUDY_IDS)[number]),
);

export function getCaseStudyGallery(study: CaseStudy): CaseStudyImage[] {
  return study.gallery ?? [];
}

export function getCaseStudyLinks(study: CaseStudy): CaseStudyLink[] {
  const links: CaseStudyLink[] = [...(study.links ?? [])];

  if (study.previewUrl) {
    const previewLink: CaseStudyLink = {
      label: study.previewLabel ?? 'View project',
      href: study.previewUrl,
      external: true,
    };

    if (!links.some((link) => link.href === previewLink.href)) {
      links.unshift(previewLink);
    }
  }

  if (study.document) {
    const documentLink: CaseStudyLink = {
      label: study.documentLabel ?? 'Download PDF',
      href: study.document,
      external: false,
    };

    if (!links.some((link) => link.href === documentLink.href)) {
      links.push(documentLink);
    }
  }

  return links;
}

export const FEATURED_TILES = [
  { label: 'BetOnline transformation', href: '#work' },
  { label: 'Design systems', href: '#work' },
  { label: 'Jurnii AI', href: '#work' },
  { label: 'Loyalty and rewards', href: '#work' },
] as const;
