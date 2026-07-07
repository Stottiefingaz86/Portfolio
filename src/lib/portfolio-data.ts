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
  groupLead?: string;
  span?: 'standard' | 'wide';
}

export interface CaseStudyLink {
  label: string;
  href: string;
  external?: boolean;
}

export interface CaseStudyVideo {
  youtubeId: string;
  title: string;
  caption?: string;
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
  tileVideo?: string;
  tileVideoPoster?: string;
  bannerImage?: string;
  gallery?: CaseStudyImage[];
  videos?: CaseStudyVideo[];
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
  role: 'VP of UI/UX · Creative Director · iGaming Expert',
  roleLines: ['VP of UI/UX.', 'Creative Director.', 'iGaming Expert.'],
  tagline: 'VP of UI/UX · Creative Director · iGaming Expert',
  heroLead:
    'An iGaming product UI/UX expert with 16 years in the industry — designing, modernising and scaling casino, sportsbook, loyalty, rewards, retention, cashier and player experience.',
  heroLeadMobile:
    'Product UI/UX expert across casino, sportsbook, loyalty, rewards, retention and player experience.',
  heroBody:
    '16 years from hands-on game design and UI through product leadership, directing UI/UX teams and design systems — then founding Jurnii.io and building AI-assisted design-to-dev workflows while consulting for a major offshore gaming brand.',
  heroKickerMobile: 'VP of UI/UX / Creative Director / iGaming Expert',
  credibilityLine:
    '16 years in iGaming · VP of UI/UX · Bright Sparks Group · Founder of Jurnii.io · Remote from Sotogrande, Spain',
  heroProofLine:
    '16 yrs iGaming · SME-led teams · 7 brands, one system · +25% YoY revenue · Jurnii.io exit',
  portfolioYear: '2K26',
  siteLogo: '/logos/sitelogo.png?v=2',
  siteLogoAlt: 'Christopher Hunt monogram',
  lockupLogo: '/logos/lockup-logo.png',
  lockupLogoAlt: 'Christopher Hunt section lockup',
  heroImage: '/images/hero.png?v=8',
  heroImageAlt: 'Cinematic casino horizon with holographic HUD roulette wheel and cyan light pillar',
  subtitle:
    'An iGaming product UI/UX expert with 16 years designing and scaling digital gambling experiences across casino, sportsbook, loyalty, rewards, retention and player experience.',
  linkedin: 'https://www.linkedin.com/in/christopher-hunt-a4193646/',
  cv: '/Christopher-Hunt-CV.pdf',
  cvDownloadName: 'Christopher-Hunt-CV.pdf',
  location: 'Sotogrande, Spain',
  portrait: '/about/christopher-hunt.png',
  portraitAlt: 'Christopher Hunt',
} as const;

export const SEO = {
  title: 'Christopher Hunt · VP of UI/UX & Creative Director',
  description:
    'Portfolio of Christopher Hunt — iGaming product UI/UX expert with 16 years across online gambling, casino, sportsbook, design systems and AI-powered customer experience.',
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
    'Cashier UX',
    'Design Systems',
    'Jurnii AI',
    'Customer Experience',
    'UX Strategy',
    'Online Gambling Design',
  ],
} as const;

export const NAV_SECTIONS = [
  { id: 'journey', label: 'Journey' },
  { id: 'work', label: 'Work' },
  { id: 'expertise', label: 'Expertise' },
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
  {
    id: 'director',
    title: 'Director',
    body: 'I directed UI/UX teams across multi-brand gambling products — setting standards, design systems, sign-off process and governance at scale, with research keeping player insight in the loop.',
    companies: [
      {
        name: 'Carousel Group',
        year: '2017',
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
          'Built and led an SME-led design function — specialists owning research, design and studio operations across casino, sportsbook, loyalty, authentication, cashier, VoC and a seven-brand design system.',
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
    id: 'leader',
    title: 'Leader',
    body: 'I moved into leading design across casino, sportsbook, loyalty, authentication, cashier, back office, My Account, multi-brand journeys and design systems.',
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
          'Consulting on Sun Bingo and platform work for Playtech — regulated gambling product design before my long-term offshore gaming engagement.',
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
    id: 'creator',
    title: 'Creator',
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
];

export const CAREER_JOURNEY = {
  title: 'How the work evolved',
  lead: `A career shaped by product maturity — from creator craft to leading teams, directing UI/UX at scale and founding an AI product.`,
  body: `Read it from where the work is now — AI, direction and platform leadership — back to the early craft years. This is the through-line: how interactive entertainment matured into complex gambling products, team leadership, systems and finally building AI.`,
  phases: [
    { id: 'ai-founder', label: 'AI Founder', detail: 'Jurnii Ltd — CX intelligence and competitor benchmarking' },
    { id: 'director', label: 'Director', detail: 'Directing UI/UX teams, design systems and governance at scale' },
    { id: 'leader', label: 'Leader', detail: 'Casino, sportsbook, loyalty, auth, cashier and multi-brand journeys' },
    { id: 'creator', label: 'Creator', detail: 'Games, Flash, slots, lottery, animation and UI craft' },
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
      proof: 'Set the product vision five verticals and seven brands work toward',
    },
    {
      title: 'Standards that scale',
      keyword: 'Standards',
      body: 'I create governance, critique frameworks and design systems that help multiple brands and verticals ship with consistency.',
      proof: 'One agnostic system · 7 brands · sign-off across the estate',
    },
    {
      title: 'Evidence over assumption',
      keyword: 'Evidence',
      body: 'I embed customer research, VoC and feedback loops so design has a stronger commercial and product rationale.',
      proof: 'VoC, CSAT and 1-to-1 player interviews embedded in the process',
    },
    {
      title: 'Close to engineering',
      keyword: 'Engineering',
      body: 'I work with development leads on handover, adoption and quality. Design only matters when it ships well.',
      proof: 'Figma → shadcn → Storybook — one source of truth',
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
  lead: 'What product and design leaders say about working with me.',
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
    { label: 'Cashier', detail: 'Deposits, withdrawals and payment journeys built for trust' },
    { label: 'Auth', detail: 'Registration, login, KYC and account verification flows' },
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
  'betheat-web3',
  'loyalty-rewards',
  'jurnii-ai',
  'maximbet-carousel',
  'casino-jackpots',
  'chomp-casino-html5',
  'williamhill-vegas',
] as const;

export interface AboutJourneyFrame {
  src: string;
  alt: string;
  label: string;
  detail: string;
  beat: string;
}

export const ABOUT = {
  title: 'Creative craft. Product depth. Commercial focus.',
  lead: `I'm English and based in Spain, where I've lived for the last 16 years with my family.

My career started in Flash, games and interactive entertainment, which gave me a hands-on foundation in motion, UI, game mechanics and digital craft. Since then, I've seen the gaming and gambling industry change completely, from Flash and early mobile casino products to modern multi-brand platforms, design systems, data-led product decisions and AI-assisted workflows.

That background still shapes how I work today. I care about the craft, but I also care about the system around it: how products are built, how teams collaborate, how players move through complex journeys and how design can help a business make better decisions.

I work closely with tools like Figma, Cursor and Mixpanel, combining design systems, product thinking, data insight and AI experimentation to improve how ideas move from concept to live product.`,
  personalTitle: 'About Me',
  portrait: '/about/me_newcastle1.png',
  portraitAlt: 'Christopher Hunt',
  journeyFrames: [
    {
      src: '/about/me_newcastle1.png',
      alt: 'Christopher Hunt with Newcastle in the background',
      label: 'South Shields · Newcastle',
      detail: 'College · Sunderland Uni',
      beat: 'Brought up in South Shields — triple distinction in art and design at college, then Design & Multimedia at the University of Sunderland.',
    },
    {
      src: '/about/me-london2.png',
      alt: 'Christopher Hunt with London in the background',
      label: 'London',
      detail: 'Digiquest · Kentish Town',
      beat: 'Digiquest and iPTV first, then Kentish Town — where gaming started and I began marketing UK gambling brands.',
    },
    {
      src: '/about/me-gibraltar3.png',
      alt: 'Christopher Hunt with Gibraltar in the background',
      label: 'Gibraltar',
      detail: 'Gambling hub',
      beat: 'Off to the rock — the centre of the industry and where serious multi-brand gambling work really began.',
    },
    {
      src: '/about/me-padel4.png',
      alt: 'Christopher Hunt at padel courts',
      label: 'Remote · Spain',
      detail: 'Work from home · padel',
      beat: 'Now — family life in Spain, remote leadership and padel whenever I can.',
    },
  ] satisfies AboutJourneyFrame[],
  personal: `Outside of work, I'm a family man, obsessed with padel, music creation and shipping small products with AI-assisted coding. I like making things, testing ideas quickly and staying close to the tools that are changing how design and development work.`,
  birthDate: '1986-07-13',
  birthDateLabel: '13/07/1986',
  persona: {
    location: 'Remote · Spain',
    focus: 'VP of UI/UX · Offshore gaming',
    goals: [
      'Build design maturity inside complex gambling organisations',
      'Connect craft, product judgment and commercial outcomes',
      'Ship governed multi-brand systems without losing speed',
    ],
    traits: [
      'Creator background',
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
    company: 'Bright Sparks Group · Fosh Tech',
    location: 'Remote · Sotogrande, Spain',
    summary:
      'For nine years — through Bright Sparks Group and now Fosh Tech — I have been the design partner building the UI/UX capability for a major offshore gaming brand. When I started, design was not yet operating as a mature function. There was no dedicated UI/UX team, no central design system and limited governance across the product estate. Early on, I modernised the casino experience. As the product matured, I expanded across sportsbook, casino, loyalty, authentication, cashier, my account, back office and multi-brand journeys. Over time, I built and led a multidisciplinary client-side team — bringing in subject-matter experts to own research, design and studio operations across the verticals — introduced UX research and Voice of Customer practices, worked closely with C-level stakeholders and product heads, and led the creation of an agnostic design system supporting seven brands — inside a business growing revenue 25% year on year.',
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
      'After Busslr, I consulted as a designer for Playtech on Sun Bingo and for Coral, doing platform and brand work that kept me close to regulated gambling product design before my long-term offshore gaming engagement.',
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
      'Busslr was my major venture outside gambling. I helped build an events app, raised £700k and led the creative and product direction. I mapped user journeys, wrote PRDs, shaped the product experience and worked directly with outsourced development teams through to launch.',
    highlights: ['£700k raised', 'Concept to launch', 'Product ownership'],
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
    phase: 'Creator',
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
    project: 'Offshore gaming brand',
    category: 'Sportsbook',
    image: '/gallery/bol-sportsbook.png',
    aspect: 'portrait',
  },
  {
    id: 'bol-vip',
    title: 'VIP Hub',
    project: 'Offshore gaming brand',
    category: 'Loyalty',
    image: '/gallery/bol-vip-hub.png',
    aspect: 'portrait',
  },
  {
    id: 'bol-casino',
    title: 'Casino',
    project: 'Offshore gaming brand',
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
    body: 'I build efficient, multidisciplinary teams by bringing in subject-matter experts who own their verticals — researchers, designers and studio managers — then setting direction, standards and execution quality across complex gambling organisations.',
    focus: ['SME-led teams', 'Standards', 'Design authority'],
    stickyIntro: {
      headline: 'Design leadership at scale.',
      deck: 'SME-led teams, systems and product judgment.',
      callout: 'SME-led teams · Standards · Design authority',
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
    title: 'Transforming a Major Offshore Gaming Brand',
    subtitle: 'From a brand cheatsheet and fragmented verticals to an agnostic design system powering seven brands.',
    client: 'Offshore gaming brand',
    scope: 'Multi-vertical · Multi-brand · Design consulting',
    outcome: 'Design once, ship across seven brands — one agnostic system, governed at scale',
    summary:
      'I have been consulting for a major offshore gaming brand for nine years. When I started, the product had no design system, no UI/UX team and no real governance — just a brand cheatsheet while casino, sportsbook and the other verticals shipped whatever they wanted. The biggest win came from investing in an agnostic design system: one component library and token layer that could flex across brands without rebuilding every surface from scratch. That let us manage more than seven brands simultaneously — design once, ship everywhere — while I built an SME-led UI/UX function, joined the verticals under one standard, and drove the estate toward shadcn-based systems, motion craft and performance.',
    tags: ['Transformation', 'Design System', 'Multi-brand'],
    category: 'Leadership',
    image: '/case-studies/betonline-home.png',
    tileImage: '/case-studies/betonline%20cover.png?v=1',
    bannerImage: '/case-studies/betonline%20banner%20case.png?v=2',
    gallery: [
      {
        group: 'Before',
        groupLead:
          'What I inherited — fragmented verticals, a brand cheatsheet instead of a system, and casino, sportsbook and account surfaces shipping independently.',
        src: '/case-studies/betonline%29old%201.png',
        alt: 'Before — inherited sportsbook experience',
        caption: 'Before · sportsbook and homepage without shared governance',
      },
      {
        group: 'Before',
        src: '/case-studies/betonline%29old%202.png',
        alt: 'Before — inherited casino experience',
        caption: 'Before · casino lobby with no component language',
      },
      {
        group: 'Design vision',
        groupLead:
          'Where the product is heading — a unified dark-mode experience with clearer hierarchy, modern casino discovery, and sportsbook surfaces built to one standard.',
        src: '/case-studies/betonline%20new1.png',
        alt: 'Design vision — modern homepage direction',
        caption: 'Design vision · unified product direction and navigation',
      },
      {
        group: 'Design vision',
        src: '/case-studies/betonline%20new2.png',
        alt: 'Design vision — casino and player experience',
        caption: 'Design vision · casino, originals and player journeys',
      },
      {
        group: 'Design system',
        groupLead:
          'The biggest win — an agnostic design system underneath it all. One component library and token layer so we could design once and ship across more than seven brands simultaneously.',
        src: '/case-studies/bol_agnostic%20system.png',
        alt: 'Agnostic design system — shared components and tokens across the estate',
        caption: 'Agnostic system · shared foundations and global icon library',
        span: 'wide',
      },
      {
        group: 'Design system',
        src: '/case-studies/bol%20agnostic2.png',
        alt: 'Multi-brand rollout from a single agnostic system',
        caption: 'Design once, ship · seven brands from one system',
        span: 'wide',
      },
    ],
    previewUrl: 'https://bol-seven.vercel.app/',
    previewLabel: 'Product prototype',
    bannerImageFit: 'cover',
    imageFit: 'contain',
    imagePosition: 'top',
    context:
      'Over nine years consulting for a major offshore gaming brand, I inherited a product that had grown without a mature design function. There was no design system — only a cheatsheet of the brand — and verticals could release whatever they wanted without passing through a central UI/UX function.',
    problem:
      'Players moved through inconsistent journeys. Teams rebuilt patterns in isolation. There was no governance, no shared component language and no design authority connecting casino, sportsbook, loyalty, auth, cashier and account experiences.',
    myRole:
      'Consulting as VP of UI/UX, I built and led a multidisciplinary team by bringing in subject-matter experts to own each vertical and area — researchers, designers and studio managers — made everything pass through design, and set the product vision teams now work toward, alongside tech, with clear goals and standards.',
    whatChanged:
      'It took time, but design moved from reactive support into a central function. The turning point was the agnostic design system — shared components, tokens and patterns that were not locked to a single brand skin. We could design a journey once and deploy it across seven brands without rebuilding from scratch. On top of that foundation we modernised key verticals, introduced governance and sign-off, and pushed toward shadcn-based implementation with stronger animation, transition and performance standards.',
    decisions:
      'I prioritised an agnostic system before scaling surface area. Brand expression had to sit on top of shared structure — not fork into seven separate codebases. That meant central review, reusable components, token-driven theming and shadcn as the implementation layer. The rule was simple: design once, ship across brands. Motion, transition quality and performance were non-negotiable — but only worth doing if the system could carry them everywhere.',
    impact:
      'Design now operates as a central function with sign-off authority across the estate — inside a business growing revenue 25% year on year. The agnostic system let us manage more than seven brands simultaneously without seven parallel design efforts. Verticals work to shared standards, new surfaces ship faster, and the product direction reflects a clearer vision — with shadcn systems, motion craft and performance as active goals.',
    leadership:
      'This case study shows I can inherit a fragmented product, build an SME-led UI/UX team from scratch, and make the highest-leverage bet — an agnostic design system that scales across brands. Design once, ship everywhere. That is how you govern seven brands without drowning in duplication.',
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
          'Built an SME-led team and raised the quality bar',
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
        title: 'Agnostic design system — the biggest win',
        items: [
          'One component library, brand-agnostic at the core',
          'Token-driven theming — swap brand, keep structure',
          'Seven brands managed simultaneously from one system',
          'Design once, ship across the estate',
          'Foundation for shadcn implementation and governance',
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
    id: 'betheat-web3',
    title: 'Transform Betheat Front End to Web 3.0',
    subtitle: 'From legacy gambling UI to a crypto-native experience — sportsbook, casino and wallet in one shadcn system.',
    client: 'Betheat',
    scope: 'Web 3.0 · Sportsbook · Casino · Wallet',
    outcome: 'An elevated crypto gambling product with a cohesive shadcn design system',
    summary:
      'Betheat reached out with a clear brief: make the product look and feel like a Web 3.0 gambling site — the dark, fast, crypto-native energy of Stake, Rainbet and the brands players now expect. I benchmarked the crypto gambling landscape, defined a new visual and interaction direction, and designed a full front-end vision across sportsbook, casino and wallet — all built on a shadcn-based design system that elevated the brand without losing clarity.',
    tags: ['Web 3.0', 'Crypto', 'Design System'],
    category: 'Transformation',
    image: '/case-studies/betheat1.png',
    tileImage: '/case-studies/betheat1.png',
    bannerImage: '/case-studies/betheat3.png',
    bannerImageFit: 'cover',
    imagePosition: 'top',
    gallery: [
      {
        src: '/case-studies/betheat1.png',
        alt: 'Betheat sportsbook — live events, racing and sports navigation',
        caption: '01 · Sportsbook — live events, racing and sports navigation',
      },
      {
        src: '/case-studies/betheat2.png',
        alt: 'Betheat sports lobby — leagues, level progress and in-play journeys',
        caption: '02 · Sports lobby — leagues, XP progress and player navigation',
      },
      {
        src: '/case-studies/betheat3.png',
        alt: 'Betheat casino lobby with crypto wallet deposit flow',
        caption: '03 · Casino and crypto wallet — deposits, networks and game discovery',
      },
    ],
    context:
      'Betheat wanted to reposition the product for a crypto-native audience. The existing experience did not match the visual language, speed or trust signals players associate with modern Web 3.0 gambling brands.',
    problem:
      'The front end felt behind the category. Sportsbook, casino and wallet did not feel like one product, the brand lacked premium crypto credibility, and there was no shared system to scale the new direction across verticals.',
    myRole:
      'As design consultant, I led research and benchmarking, set the Web 3.0 experience direction and designed new sportsbook, casino and wallet surfaces on top of a shadcn-based design system.',
    whatChanged:
      'I researched Stake, Rainbet and leading crypto gambling products, translated those patterns into a Betheat-specific system, and designed a dark, high-contrast product language with clearer hierarchy, stronger navigation and a wallet experience that felt native to crypto — not bolted onto a legacy shell.',
    decisions:
      'Benchmarking came first — understanding what players trust in crypto gambling before designing anything. shadcn gave us a disciplined component foundation: consistent buttons, inputs, drawers and cards that engineering could implement quickly. Sportsbook, casino and wallet shared the same tokens, spacing and interaction patterns so the brand felt elevated and unified. The wallet was treated as a core product surface, not a cashier afterthought — deposit, network selection and address copy needed the same polish as the lobby.',
    impact:
      'Delivered a cohesive Web 3.0 front-end vision across sportsbook, casino and wallet, with a shadcn design system the team could build from — raising brand perception and giving Betheat a credible crypto-native product story.',
    leadership:
      'Shows how I take a repositioning brief, benchmark the category, and translate trend-led expectations into a governed design system and product surfaces that teams can actually ship.',
    stages: [
      {
        title: 'Category research',
        items: [
          'Benchmarked Stake, Rainbet and leading crypto gambling products',
          'Mapped the visual and UX patterns players now expect',
          'Defined what Web 3.0 meant for Betheat — not a skin, a product shift',
        ],
      },
      {
        title: 'shadcn design system',
        items: [
          'Built a dark, high-contrast component foundation on shadcn',
          'Shared tokens across sportsbook, casino and wallet',
          'Elevated brand feel with consistent hierarchy and interaction craft',
        ],
      },
      {
        title: 'Product surfaces',
        items: [
          'New sportsbook with live events, racing and sports navigation',
          'Casino lobby with promotions, providers and game discovery',
          'Crypto wallet with deposit, network selection and address flows',
        ],
      },
    ],
  },
  {
    id: 'loyalty-rewards',
    title: 'Loyalty and Rewards',
    subtitle: 'Gaming has become loyalty and rewards focused for retention.',
    client: 'Offshore gaming brand',
    scope: 'Campaigns · VIP hub · Retention',
    outcome: 'Retention-led journeys with clearer player value',
    summary:
      'As the product matured, the business shifted towards loyalty, rewards and retention. I led design across campaigns, promotion surfaces and the VIP hub, helping players see value more clearly and giving the business stronger tools to keep them coming back.',
    tags: ['Loyalty', 'VIP', 'Retention'],
    category: 'Loyalty',
    image: '/case-studies/vip-hub-drawer.png',
    tileImage: '/case-studies/loyalty_cover.png?v=2',
    bannerImage: '/case-studies/loyalty%20case%20study%20banner.png?v=1',
    previewUrl: 'https://bol-seven.vercel.app/casino?vip=true&section=Overview&hubFocus=true',
    previewLabel: 'VIP Hub',
    previewFocus: 'vip-hub',
    context:
      'Gaming has become loyalty and rewards focused for retention. The offshore group needed player-facing surfaces that made rewards feel tangible, not buried in the product.',
    problem:
      'Promotion and loyalty experiences were inconsistent. High-value players did not always get a clear VIP journey, and campaign surfaces did not always connect back to the wider product.',
    myRole:
      'As VP of UI/UX, I set direction for loyalty, rewards and retention-led journeys across campaigns and the VIP hub.',
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
    title: 'Increase Casino Revenue Through Design',
    subtitle: 'A modular casino canvas — back-office controlled, behaviour-led and built for performance.',
    client: 'Offshore gaming brand',
    scope: 'Casino · Canvas · Personalisation · Revenue',
    outcome: 'A smarter lobby that surfaced the right games, lifted engagement and protected performance',
    summary:
      'Working with the Head of Casino, design and engineering, I helped shape a modular casino experience we called Canvas — a front end fully controlled from the casino back office. Tiles could take different shapes, carousels could be built dynamically from player behaviour, and metadata on the front end made content clearer for users and sharper for the business. The result was a lobby that felt more personal, more commercial and faster where it mattered.',
    tags: ['Casino', 'Personalisation', 'Revenue'],
    category: 'Casino',
    image: '/case-studies/casino_case_study_cover.png',
    tileImage: '/case-studies/casino_case_study_cover.png',
    gallery: [
      {
        src: '/case-studies/casino_image_1.png',
        alt: 'Casino game surface with jackpot tiers and loyalty progress in the menu',
        caption: '01 · Metadata, jackpots and loyalty in player flow',
      },
      {
        src: '/case-studies/casino_image_2.png',
        alt: 'Casino For You lobby with activity feed and popular games',
        caption: '02 · For You tab, activity feed and discovery',
      },
      {
        src: '/case-studies/casino_image_3.png',
        alt: 'Cash tournaments carousel and instant wins row',
        caption: '03 · Dynamic carousels and varied tile shapes',
      },
      {
        src: '/case-studies/casino_image_4.png',
        alt: 'Jackpot wheel with mini, minor, major and mega tiers',
        caption: '04 · Jackpot hierarchy and commercial moments',
      },
    ],
    context:
      'Casino needed to move beyond static lobbies. The business wanted more control over what appeared, when and why — without engineering rebuilding the front end every time. Design had to lead with a modular model that product, casino and tech could all operate.',
    problem:
      'The legacy lobby treated games as flat content blocks. There was no flexible way to promote high-value titles, respond to player behaviour or surface loyalty progress in the journey. Personalisation was limited, commercial priorities were hard to express in the UI, and heavy motion risked hurting performance on the devices players actually used.',
    myRole:
      'As VP of UI/UX, I led the casino experience direction alongside the Head of Casino, design and engineering — defining the Canvas model, tile system, navigation structure and performance standards before we scaled personalisation and retention features across the lobby.',
    whatChanged:
      'We built Canvas: a modular casino front end controlled entirely from the back office. Operators could compose varied tile shapes, spin up behaviour-led carousels and show games players were likely to enjoy based on gameplay history. We added metadata to tiles so players got clearer information on the surface, and the business could serve the right content at the right moment. Commercial hierarchy came through in the layout — originals and stronger rev-share titles earned more prominent DVD-style tiles up front, while lower rev-share games still had a path to discovery without dominating the estate. Navigation was reorganised around a For You tab with personalised content, quick access to favourites and search, plus a Play Random action that removed choice for players who just wanted the product to decide — the Netflix late-night scroll, but for casino. VIP and loyalty progress moved into the banner carousel so players could see status in flow, improving retention and time on page.',
    decisions:
      'Design had to be modular first. Canvas was the foundation — not decoration on top of a rigid lobby. Tile shape, order and carousel logic were product decisions with revenue attached, so we treated them that way. Metadata was not an afterthought: it helped users understand what they were clicking and helped us target content more intelligently. Personalisation lived in For You, favourites and Play Random, but always with a performance guardrail — animation and motion were only worth shipping if they did not slow the experience down. In iGaming, a beautiful lobby that stutters is a losing lobby.',
    impact:
      'Casino became easier to operate and easier to personalise. The business could push commercial priorities — including originals and rev-share deals — without sacrificing clarity for the player. Behaviour-led carousels and metadata made discovery feel more relevant, while loyalty and VIP visibility in the banner layer supported retention. Performance stayed a first-class requirement throughout, not a late optimisation pass.',
    leadership:
      'This case study shows how I work at the intersection of design, casino product and engineering: setting the experience model, making commercial logic visible in the UI, and refusing to trade performance for polish. Revenue, retention and player clarity can move together when the system is designed properly from the start.',
    stages: [
      {
        title: 'Canvas — modular by design',
        items: [
          'Front end fully controlled from the casino back office',
          'Tiles in varied shapes, composed without engineering rebuilds',
          'Design, casino and tech aligned on one flexible system',
          'Modular first — we called it Canvas, not a skin on the old lobby',
        ],
      },
      {
        title: 'Smarter discovery',
        items: [
          'Dynamic carousels built from player behaviour',
          'Games surfaced based on gameplay history and likely interest',
          'Metadata on tiles — clearer for users, sharper for targeting',
          'Right content at the right time, not just more content',
        ],
      },
      {
        title: 'Commercial hierarchy',
        items: [
          'Originals and stronger rev-share titles promoted up front',
          'DVD-style tiles for high-value games that needed to stand out',
          'Lower rev-share titles still discoverable without dominating the lobby',
          'Layout as a revenue lever, not only a visual one',
        ],
      },
      {
        title: 'Navigation & retention',
        items: [
          'For You tab with personalised content',
          'Quick access to favourites, search and Play Random',
          'Play Random for choice-fatigued players — tell me what to play',
          'VIP and loyalty progress integrated into the banner carousel',
        ],
      },
      {
        title: 'Performance as standard',
        items: [
          'Animation and motion reviewed against device performance',
          'Heavy movement rejected when it hurt load or interaction',
          'Design quality measured by feel and speed together',
          'Performance treated as a product requirement from day one',
        ],
      },
    ],
  },
  {
    id: 'design-governance',
    title: 'Building Design Governance Across Multiple Brands',
    client: 'Offshore gaming brand',
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
      'As VP of UI/UX, I set design direction, standards and quality expectations across the product estate.',
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
    client: 'Offshore gaming brand',
    scope: '7 brands · Design system',
    outcome: 'A shared system for multi-brand delivery',
    summary:
      'How I led the development of an agnostic design system used across seven brands, improving consistency, scalability and design-to-development delivery.',
    tags: ['Design Systems', 'Multi-brand', 'Governance'],
    category: 'Systems',
    image: '/gallery/bol-vip-banner.png',
    context:
      'The product estate spanned casino, sportsbook, loyalty, authentication, cashier and back office across multiple live brands with no mature shared system.',
    problem:
      'Teams were rebuilding patterns from scratch. Inconsistency slowed delivery and made cross-brand experiences harder to maintain.',
    myRole:
      'As VP of UI/UX, I led the creation of an agnostic design system and worked with development leads to improve adoption and handover.',
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
    client: 'Offshore gaming brand',
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
      'As VP of UI/UX, I introduced UX strategy through Voice of Customer reports, one-to-one interviews, CSAT surveys and player feedback analysis.',
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
  {
    id: 'maximbet-carousel',
    title: 'MaximBet — US Market Entry',
    subtitle: 'Early UX direction for Carousel Group\'s regulated sportsbook launch in the United States.',
    client: 'Carousel Group · MaximBet',
    scope: 'US sportsbook · 0 → 1 · UX consulting',
    outcome: 'A credible US player experience shaped before launch',
    summary:
      'In 2017 I consulted for Carousel Group as they prepared to enter the regulated US gambling market. Drawing on years already working in US-facing product, I worked closely with the CEO and product team in the early stages — helping set the user experience direction and contributing to the creation of MaximBet, Carousel’s sportsbook brand built for American players.',
    tags: ['US market', 'Sportsbook', '0 → 1'],
    category: 'Consulting',
    image: '/case-studies/maxim_cover.jpg',
    tileImage: '/case-studies/maxim_cover.jpg',
    tileVideo: '/case-studies/carouselgroup.mp4',
    tileVideoPoster: '/case-studies/maxim_cover.jpg',
    bannerImage: '/case-studies/maximbet_case%20study.webp',
    bannerImageFit: 'cover',
    imagePosition: 'top',
    gallery: [
      {
        src: '/case-studies/maximbet_case%20study.webp',
        alt: 'MaximBet sportsbook experience — homepage and product direction',
        caption: '01 · MaximBet — early sportsbook experience direction',
      },
      {
        src: '/case-studies/maximbet_app.webp',
        alt: 'MaximBet mobile app — registration and player onboarding',
        caption: '02 · Mobile app — onboarding and account creation flows',
      },
      {
        src: '/case-studies/maxim_cover.jpg',
        alt: 'MaximBet brand and product cover',
        caption: '03 · Brand and product identity for the US launch',
      },
    ],
    context:
      'Carousel Group was a gaming and hospitality operator making a serious push into the newly opening US sports betting market. MaximBet — built in partnership with the Maxim brand — was their vehicle to compete in regulated states with a product that could stand up to established US operators, not feel like a European sportsbook pasted onto American rails.',
    problem:
      'Entering the US meant more than licensing. Carousel needed a product story players would trust, journeys that matched how Americans discover, register, deposit and bet, and early UX decisions that would scale as more states came online — without rebuilding the experience every time regulation shifted.',
    myRole:
      'As a consultant in 2017, I worked directly with the CEO and product team in the formative phase of MaximBet — bringing US gambling market experience from prior work, helping define the player experience, and contributing to the early product and design direction as the brand took shape.',
    whatChanged:
      'I helped translate US market expectations into concrete experience decisions: how the sportsbook should feel on first visit, how registration and onboarding should reduce friction, how mobile needed to lead the proposition, and how MaximBet could differentiate while still feeling credible next to incumbents. The work sat upstream of launch — setting UX standards and product intent before the team scaled execution.',
    decisions:
      'US players expect clarity, speed and brand confidence from the first screen. I pushed for mobile-first thinking, simpler registration paths, and a sportsbook hierarchy that mirrored how US bettors browse — leagues, live action and promotions — rather than offshore patterns that do not travel. Working with leadership early meant design had a seat while the product was still being defined, not after engineering had already committed.',
    impact:
      'Gave Carousel a stronger UX foundation for MaximBet’s US entry — aligned leadership and product around a player experience shaped for regulated markets, with early flows and product direction the team could build from as the launch programme accelerated.',
    leadership:
      'Shows how I consult at founder and CEO level on 0 → 1 market entry — bringing category experience, shaping UX before teams scale, and helping new brands enter complex regulated markets with product clarity rather than guesswork.',
    stages: [
      {
        title: 'Carousel Group & the US opportunity',
        items: [
          'Carousel entering regulated US sports betting',
          'MaximBet as the sportsbook brand for American players',
          'Partnership with Maxim — lifestyle and media reach',
          'Need for US-native product, not offshore transplant',
        ],
      },
      {
        title: 'Early product & UX',
        items: [
          'Worked closely with CEO and product leadership',
          'Defined first-visit and sportsbook hierarchy direction',
          'Mobile app and onboarding experience foundations',
          'US market patterns applied from prior gambling work',
        ],
      },
      {
        title: 'Setting direction before scale',
        items: [
          'UX standards established upstream of launch',
          'Registration and player journey clarity',
          'Experience shaped for regulated state rollout',
          'Foundation for teams to execute against',
        ],
      },
    ],
  },
  {
    id: 'chomp-casino-html5',
    title: 'Chomp Casino — First HTML5 Game Studio',
    subtitle: 'Leading UI/UX and game design on one of iGaming\u2019s first in-house HTML5 game catalogues.',
    client: 'Nektan · Chomp Casino',
    scope: 'HTML5 games · White-label casino · Game design',
    outcome: 'A 15-title HTML5 catalogue and a mobile-first B2C casino brand',
    summary:
      'Around twelve years ago, while the rest of the industry was still shipping casino games in Flash, I led UI/UX and game design at Nektan on one of the first in-house HTML5 game catalogues. We built a white-label casino platform and launched Chomp Casino as our own B2C brand on top of it. HTML5 was a genuine shift in how people would gamble online — games running natively in a mobile browser instead of a desktop plugin — and we designed and built fifteen games from scratch, including blackjack and roulette.',
    tags: ['HTML5 Games', 'Game Design', 'Mobile'],
    category: 'Games',
    image: '/case-studies/chomp%20casino_nektan_cover/chomp%20cover.png',
    tileImage: '/case-studies/chomp%20casino_nektan_cover/chomp%20cover.png',
    bannerImage: '/case-studies/chomp%20casino_nektan_cover/chomp%20cover.png',
    bannerImageFit: 'contain',
    imageFit: 'contain',
    imagePosition: 'center',
    videos: [
      {
        youtubeId: 'NpC6rj7x6is',
        title: 'Chomp Casino — HTML5 gameplay',
        caption: '01 · Chomp Casino — HTML5 games running natively in the mobile browser',
      },
      {
        youtubeId: 'xOk92iXp7_A',
        title: 'Chomp Casino — game catalogue',
        caption: '02 · Part of the in-house HTML5 catalogue — 15 games including blackjack and roulette',
      },
    ],
    context:
      'Nektan operated a white-label casino platform, powering branded casinos for partners. Chomp Casino was our own consumer-facing brand built on that platform — the shop window for what the technology and the games could do. This was roughly twelve years ago, at the moment HTML5 was starting to challenge Flash as the way rich, interactive gambling games reached players.',
    problem:
      'Casino games had grown up in Flash on the desktop. As players moved to smartphones, that model broke — plugins were dying, performance on mobile browsers was poor, and the industry had very little proven experience building genuinely mobile-first casino games. We needed a catalogue of games that felt premium and responsive, built in a new technology, with almost no established playbook to follow.',
    myRole:
      'I was the lead UI/UX and game designer for the project. I owned the look, feel and interaction of the games and the surrounding casino, and worked hands-on through the build. My background designing interactive IPTV games at Digiquest turned out to be a direct advantage — the constraints and build process were remarkably similar, so I could bring real experience to a problem most of the team was seeing for the first time.',
    whatChanged:
      'We moved game production in-house and built the catalogue in HTML5 from the ground up rather than porting Flash titles. I designed the game interfaces, the casino lobby and the player experience for touch-first, small-screen play — reworking controls, layouts and feedback that had only ever been designed for a mouse and a large monitor. In total we shipped fifteen games, including table classics like blackjack and roulette alongside slots.',
    decisions:
      'The core decision was to design for the mobile browser first, not adapt desktop games down to it. That meant rethinking bet controls, spin and deal interactions, readability and animation performance for touch and constrained hardware. We built in-house so design and engineering sat together and could iterate on feel — the responsiveness of a spin, the timing of a payout — rather than accepting whatever a third-party studio handed over. HTML5 was chosen deliberately as the future-proof path as Flash declined.',
    impact:
      'We delivered one of the early in-house HTML5 casino catalogues in the industry — fifteen games and a live B2C brand in Chomp Casino — at a point when most operators were still tied to Flash. It proved that a full, premium casino experience could run natively in a mobile browser, and gave Nektan a modern game studio capability and a brand to showcase it.',
    leadership:
      'This is where my iGaming game-design foundation was set. It shows I can lead design into brand-new technology with no established playbook, build a catalogue of products hands-on, and bring hard-won experience from an adjacent field — interactive IPTV games — to de-risk a shift the rest of the market was still figuring out.',
    stages: [
      {
        title: 'The HTML5 shift',
        items: [
          'Industry still shipping casino games in Flash',
          'Players moving to smartphones and mobile browsers',
          'Plugins dying, little proven mobile-first game craft',
          'HTML5 chosen as the future-proof path',
        ],
      },
      {
        title: 'Building the studio in-house',
        items: [
          'Game production brought in-house at Nektan',
          'Design and engineering iterating on feel together',
          'IPTV game experience from Digiquest applied directly',
          'White-label platform with Chomp Casino as the B2C brand',
        ],
      },
      {
        title: 'The catalogue',
        items: [
          '15 HTML5 games designed and shipped',
          'Table classics — blackjack and roulette',
          'Slots built for touch-first play',
          'Mobile-first lobby and player experience',
        ],
      },
    ],
  },
  {
    id: 'williamhill-vegas',
    title: 'William Hill Vegas — Exclusive Slots Trilogy',
    subtitle: 'Lead designer on a trilogy of Flash slots built exclusively for William Hill Vegas Casino.',
    client: 'Nektan · William Hill Vegas',
    scope: 'Slot game design · Flash · Animation & sound',
    outcome: 'A three-game slot trilogy shipped exclusively for a Tier 1 operator',
    summary:
      'Before the HTML5 era, when slots were still authored in Flash, Nektan was commissioned to build slot games exclusively for William Hill Vegas Casino — one of the biggest names in UK gambling. Working with our in-house design team and developers, I was the lead designer across a trilogy of games. I covered the whole experience — layout, reels, bonus rounds, animation and sound — piecing it all together in Flash on the timeline.',
    tags: ['Slot Design', 'Flash', 'Animation'],
    category: 'Games',
    image: '/case-studies/williamhill/william%20hill%20cover.png',
    tileImage: '/case-studies/williamhill/william%20hill%20cover.png',
    bannerImage: '/case-studies/williamhill/william-hill-vegas-casino-banner.jpg',
    bannerImageFit: 'cover',
    imagePosition: 'center',
    videos: [
      {
        youtubeId: 'uFSRPByBH2Q',
        title: 'William Hill Vegas slot — game one',
        caption: '01 · Exclusive slot for William Hill Vegas — reels, bonus round and animation',
      },
      {
        youtubeId: '_KlXGk-c5DE',
        title: 'William Hill Vegas slot — game two',
        caption: '02 · Second title in the trilogy — layout, motion and sound design',
      },
      {
        youtubeId: 'm-5EATVcK3w',
        title: 'William Hill Vegas slot — game three',
        caption: '03 · Third title in the trilogy — full game experience built in Flash',
      },
    ],
    context:
      'William Hill is one of the biggest and most established names in UK gambling, and its Vegas casino is a flagship destination for slots players. Nektan was commissioned to build games exclusively for that casino. This was before Chomp Casino and the HTML5 shift — slots were still authored in Adobe Flash, assembled frame by frame on the timeline.',
    problem:
      'Making games for a Tier 1 operator meant the bar for polish, entertainment and reliability was high — these titles would sit next to the best in the market on a brand players already trusted. Everything had to be crafted by hand in Flash: the reel mechanics, the bonus rounds, every animation and every sound cue, all timed and layered on the timeline with no modern game engine to lean on.',
    myRole:
      'I was the lead designer across the trilogy, working alongside our in-house design team and developers. I owned the full game experience end to end — the layout and reel presentation, the bonus round design, the animation and the sound — and pieced it all together in Flash on the timeline, so the pacing, feedback and payoff all felt right.',
    whatChanged:
      'We delivered a trilogy of bespoke slots exclusively for William Hill Vegas — not reskinned templates, but games designed and built from the ground up. Each title had its own layout, bonus mechanics, animation language and audio, crafted to feel premium and entertaining while fitting the William Hill Vegas environment.',
    decisions:
      'In Flash-era slot production the feel of a game lives in the timeline — the timing of a spin, the anticipation before a bonus, the reward of a win. I focused on getting that pacing and feedback right, treating animation and sound as core to the experience rather than decoration. Designing the layout, bonus rounds, motion and audio together kept each game cohesive instead of a set of parts stitched at the end.',
    impact:
      'Nektan shipped a trilogy of slots exclusively for one of the UK\u2019s biggest operators — games polished enough to sit inside the William Hill Vegas casino alongside established studios. It established the in-house design and development capability that later carried into the HTML5 work on Chomp Casino.',
    leadership:
      'This is the foundation of my iGaming craft — leading the design of real, shipped slot products for a Tier 1 brand, owning the whole experience from layout to sound, and doing it hands-on in the demanding Flash-timeline era before modern tooling existed.',
    stages: [
      {
        title: 'The commission',
        items: [
          'William Hill Vegas — a Tier 1 UK casino brand',
          'Nektan commissioned to build games exclusively',
          'Flash-era production, before the HTML5 shift',
          'A trilogy of bespoke slot titles',
        ],
      },
      {
        title: 'Lead design — end to end',
        items: [
          'Layout and reel presentation',
          'Bonus round design and mechanics',
          'Animation crafted on the Flash timeline',
          'Sound design integrated into the experience',
        ],
      },
      {
        title: 'Shipped and set the foundation',
        items: [
          'Three bespoke games delivered for William Hill Vegas',
          'Premium feel fit for a flagship casino',
          'In-house design and dev capability proven',
          'Foundation for the later HTML5 game studio',
        ],
      },
    ],
  },
];

export const WORK_CASE_STUDY_ORDER = [
  ...FEATURED_CASE_STUDY_IDS,
  'design-system',
  'customer-voice',
  'lucky-lagoon',
  'design-governance',
] as const;

export const WORK_CASE_STUDIES = WORK_CASE_STUDY_ORDER.map((id) =>
  CASE_STUDIES.find((study) => study.id === id),
).filter((study): study is CaseStudy => study !== undefined);

export const FEATURED_CASE_STUDIES = FEATURED_CASE_STUDY_IDS.map((id) =>
  CASE_STUDIES.find((study) => study.id === id),
).filter((study): study is CaseStudy => study !== undefined);

export const WORK_FEATURED_CASE_STUDIES = FEATURED_CASE_STUDIES;

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
  { label: 'Offshore brand transformation', href: '#work' },
  { label: 'Design systems', href: '#work' },
  { label: 'Jurnii AI', href: '#work' },
  { label: 'Loyalty and rewards', href: '#work' },
] as const;
