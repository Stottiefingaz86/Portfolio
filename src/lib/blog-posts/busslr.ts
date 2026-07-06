import type { BlogPost } from '@/lib/blog-types';

const busslrImg = (index: number) => `/blog/busslt%20image${index}.jpg`;
const busslrCover = '/blog/busslt%20cover.jpg';

export const busslrPost: BlogPost = {
  id: 'busslr',
  slug: 'busslr',
  title: 'Busslr: The Event App That Took Over Manchester',
  date: '2015',
  excerpt:
    'We raised £700k, built an events platform for public and private gatherings, and launched at Manchester Uni — with multi-channel invites, flash sales for local businesses, payments, chat and matchmaking. The venture did not survive, but the lessons did.',
  tag: 'Founder story',
  readTime: '9 min read',
  heroImage: busslrCover,
  blocks: [
    {
      type: 'paragraph',
      text: 'In **2015**, I helped build **Busslr** — an events app born from a simple, everyday frustration.',
    },
    {
      type: 'paragraph',
      text: 'You wanted to get friends together. Some lived on **WhatsApp**. Some only replied on **Facebook**. Others still wanted a **text message**. Planning one night out meant juggling three different channels and hoping everyone actually saw the invite.',
    },
    {
      type: 'paragraph',
      text: 'Busslr was built to fix that.',
    },
    {
      type: 'video',
      youtubeId: 'GmZwytdb4RA',
      title: 'Busslr teaser',
      caption: 'The Busslr teaser — events, discovery and getting the party started.',
    },
    { type: 'heading', level: 2, text: 'Public and Private Events' },
    {
      type: 'paragraph',
      text: 'The app had two modes.',
    },
    {
      type: 'paragraph',
      text: '**Private events** were for your circle. You created the event inside Busslr and the platform sent invites through whatever channel each friend actually used — WhatsApp, Facebook, SMS — so nobody got left out because they were on the wrong app.',
    },
    {
      type: 'paragraph',
      text: '**Public events** surfaced on a local dashboard. Based on the activities you cared about, you could discover what was happening in your area — gigs, meetups, pop-ups, whatever was moving near you.',
    },
    {
      type: 'callout',
      text: 'One event. The right channel for every friend. No more copy-pasting links across three apps.',
    },
    { type: 'heading', level: 2, text: 'Flash Events for Local Business' },
    {
      type: 'paragraph',
      text: 'We also built for **cottage industries** — the pubs, venues, independents and small operators that do not have a marketing department but do have a reason to fill a room on a Tuesday night.',
    },
    {
      type: 'paragraph',
      text: 'Companies could post **flash events** and **flash sales** through Busslr: last-minute offers designed to bring people in and turn quiet nights into busy ones. It was less about big-brand campaigns and more about giving local businesses a direct line to people already looking for something to do.',
    },
    { type: 'heading', level: 2, text: 'More Than a Calendar' },
    {
      type: 'paragraph',
      text: 'Busslr was not just listings and invites. We built an **internal payment system**, **in-app chat**, and even **matchmaking**.',
    },
    {
      type: 'paragraph',
      text: 'Turn up to an event, see someone you like, send a **heart**. If they sent one back, you were connected. It was social discovery layered on top of real-world attendance — not swiping from your sofa, but meeting people where the night was actually happening.',
    },
    {
      type: 'list',
      items: [
        'Multi-channel private invites — WhatsApp, Facebook, SMS',
        'Public event discovery based on your interests and location',
        'Flash events and flash sales for local businesses',
        'In-app payments, chat and event matchmaking',
      ],
    },
    {
      type: 'image',
      src: busslrImg(1),
      alt: 'Busslr onboarding — explore events near you with a single tap',
      caption: 'Explore events near you — no registration required to start.',
      layout: 'wide',
    },
    {
      type: 'image',
      src: busslrImg(2),
      alt: 'Busslr public event feed — Near You, Attending and Friends tabs',
      caption: 'Public discovery — local events surfaced by interest, distance and category.',
      layout: 'wide',
    },
    { type: 'heading', level: 2, text: 'The Team and the Build' },
    {
      type: 'paragraph',
      text: 'There were **three of us**: two founders and me on **product and marketing**. We raised around **£700,000** and worked with a development agency in **India**, where I spent a lot of time shaping the platform for **Android and iOS**.',
    },
    {
      type: 'paragraph',
      text: 'It was founder-speed execution — product decisions in the morning, builds overnight, feedback loops across time zones. Not glamorous, but how a lot of early-stage mobile products actually get made when you are trying to beat the clock with limited runway.',
    },
    { type: 'heading', level: 2, text: 'Launching in Manchester' },
    {
      type: 'paragraph',
      text: 'We launched in **Manchester** and went hard at the student market. We **took over Manchester Uni**, built a real customer base on campus, and proved the idea had traction with the audience we cared about most — young people who lived on their phones and went out multiple nights a week.',
    },
    {
      type: 'paragraph',
      text: 'For a while, it worked. Events were being created. Invites were going out on the right channels. Local businesses were testing flash offers. The product felt alive.',
    },
    {
      type: 'image',
      src: busslrImg(3),
      alt: 'Busslr Manchester Uni launch — promotional booth and team',
      caption: 'Manchester Uni launch — on-campus activation and the #WhatsYourThing campaign.',
      layout: 'wide',
    },
    {
      type: 'image',
      src: busslrImg(4),
      alt: 'Busslr team at Manchester Uni promotional event',
      caption: 'Building the brand in person — not just in the app store.',
      layout: 'wide',
    },
    { type: 'heading', level: 2, text: 'The Web Series' },
    {
      type: 'paragraph',
      text: 'We did not just ship software — we made content. I co-wrote a **web series** with **Woolard and Marlow** to bring the brand to life and give Busslr a voice beyond the app store.',
    },
    {
      type: 'video',
      youtubeId: 'o0xPGs5Jr6o',
      title: 'Busslr web series — episode 1',
      caption: 'Episode 1 — co-written with Woolard and Marlow.',
    },
    {
      type: 'video',
      youtubeId: 'LOz5EG1c5MU',
      title: 'Busslr web series — episode 2',
      caption: 'Episode 2 — the story continued.',
    },
    {
      type: 'video',
      youtubeId: '7scyfkmlVCU',
      title: 'Busslr web series — episode 3',
      caption: 'Episode 3 — co-written with Woolard and Marlow.',
    },
    { type: 'heading', level: 2, text: 'When the Venture Did Not Survive' },
    {
      type: 'paragraph',
      text: 'Unfortunately, Busslr did not make it.',
    },
    {
      type: 'paragraph',
      text: 'Nearly **£700k** sounds like a lot until you are trying to grow a **B2C app** in a market where user acquisition, retention and local density all have to click at once. We learned — painfully — that it takes **more than almost a million pounds** to win in consumer social, especially when you are fighting for habit against incumbents that already own the communication layer.',
    },
    {
      type: 'paragraph',
      text: 'The product was ambitious. The team was committed. Manchester gave us proof. But runway, market timing and the economics of two-sided local networks caught up with us.',
    },
    { type: 'heading', level: 2, text: 'What It Taught Me' },
    {
      type: 'paragraph',
      text: 'Busslr taught me to design for **real friction**, not hypothetical users. The WhatsApp-vs-Facebook problem was not a edge case — it was the product.',
    },
    {
      type: 'paragraph',
      text: 'It taught me how to **launch locally** before thinking globally: own one campus, one city, one nightlife loop — then expand. And it taught me that **full-stack consumer products** — payments, chat, discovery, matchmaking — are expensive to build and even more expensive to grow.',
    },
    {
      type: 'paragraph',
      text: 'Years later, I still think about Busslr when I am designing for behaviour across channels, or when a client assumes a single notification path is enough. It rarely is. Busslr was my attempt to meet people where they already were — and to turn almost showing up into actually showing up.',
    },
  ],
};
