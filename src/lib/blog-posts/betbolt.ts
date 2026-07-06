import type { BlogPost } from '@/lib/blog-types';

const deck = (index: number) => `/blog/Bet%20Bolt%20Product%20Deck_${index}.jpg`;

export const betboltPost: BlogPost = {
  id: 'betbolt',
  slug: 'betbolt',
  title: 'BetBolt: Turning Sports Betting Into a Game',
  date: '2016',
  excerpt:
    'In 2016 I built BetBolt — a sportsbook for recreational players who find traditional books too busy and noisy. Think Tinder for bets, with a countdown, disappearing prices and casino-style anticipation.',
  tag: 'Founder story',
  readTime: '7 min read',
  heroImage: '/case-studies/betbolt_blog_cover.png',
  blocks: [
    {
      type: 'paragraph',
      text: 'In **2016**, I started a company called **BetBolt**.',
    },
    {
      type: 'paragraph',
      text: 'The idea was simple, but it came from a real problem.',
    },
    {
      type: 'paragraph',
      text: 'Most sportsbooks are built for people who already know what they want. They are busy, noisy and full of markets most casual players do not understand. For recreational bettors — people who like sport, want a flutter and do not want to feel stupid — the experience is often overwhelming.',
    },
    {
      type: 'paragraph',
      text: 'BetBolt was designed for them.',
    },
    { type: 'heading', level: 2, text: 'The Idea: Tinder for Bets' },
    {
      type: 'paragraph',
      text: 'Instead of dropping people into a wall of markets, BetBolt served bets upfront in a **deck** — one card at a time, based on the sports and teams they cared about.',
    },
    {
      type: 'paragraph',
      text: 'Think **Tinder, but for bets we think you will like**.',
    },
    {
      type: 'image',
      src: deck(1),
      alt: 'BetBolt onboarding — tell us what sports and teams you bet on',
      caption: 'We ask, you get — building a tailored profile from the sports and teams you care about.',
      layout: 'wide',
    },
    {
      type: 'paragraph',
      text: 'We asked users what they followed. That gave us enough signal to serve the right markets without making them hunt through a traditional sportsbook.',
    },
    {
      type: 'paragraph',
      text: 'Each bet sat on a card with a **timer counting down**. When time ran out, the bet disappeared. You would not get that price again.',
    },
    {
      type: 'paragraph',
      text: 'That was deliberate.',
    },
    {
      type: 'paragraph',
      text: 'We wanted to turn sports betting into something closer to a **casino game** — anticipation, urgency, a clear decision and then the next card. Simple bets. Less noise. More momentum.',
    },
    {
      type: 'image',
      src: deck(2),
      alt: 'BetBolt live betting card with countdown timer and place bet action',
      caption: 'Live betting under the clock — one decision, one price, then it is gone.',
      layout: 'wide',
    },
    { type: 'heading', level: 2, text: 'The Bet Deck' },
    {
      type: 'paragraph',
      text: 'For pre-match, we called it the **Bet Deck**.',
    },
    {
      type: 'paragraph',
      text: 'Your favourite categories, served one by one. Swipe no thanks, or add to slip. Change the market type on the card — moneyline, spread, totals — and adjust stake to see payout update instantly.',
    },
    {
      type: 'image',
      src: deck(3),
      alt: 'BetBolt Bet Deck — pre-match bets served one card at a time',
      caption: 'The Bet Deck — favourite sports, one bet at a time, with odds and payout on the card.',
      layout: 'wide',
    },
    {
      type: 'callout',
      text: 'See bet → Decide under pressure → Act or lose the price → Next card',
    },
    { type: 'heading', level: 2, text: 'Casino Cross-Sell and Parlay Blitz' },
    {
      type: 'paragraph',
      text: 'Because the interface focused on **one bet at a time**, cross-sell moments hit harder. When we pushed casino or promotions, they had a real focal point instead of getting lost in a cluttered lobby.',
    },
    {
      type: 'image',
      src: deck(4),
      alt: 'BetBolt casino cross-sell promotion on the bet card',
      caption: 'Cross-sell with focus — one promotion, one decision, at the right moment.',
      layout: 'wide',
    },
    {
      type: 'paragraph',
      text: 'We also built **Parlay Blitz** — a side game for building parlays without the usual friction. Pick your number of legs, underdogs or favourites, sport or mix, set your stake, then **Spin Your Parlay**.',
    },
    {
      type: 'paragraph',
      text: 'The language was intentional. Casino players already understood spin. We were bridging sportsbook and casino, not bolting them together awkwardly.',
    },
    {
      type: 'image',
      src: deck(5),
      alt: 'BetBolt Parlay Blitz — spin your parlay from simple choices',
      caption: 'Parlay Blitz — make parlays feel like a game, not a spreadsheet.',
      layout: 'wide',
    },
    { type: 'heading', level: 2, text: 'The Amaya Pitch' },
    {
      type: 'paragraph',
      text: 'I took BetBolt to the **CEO of Amaya** — the company behind PokerStars.',
    },
    {
      type: 'paragraph',
      text: 'Their problem was conversion. They had around **100 million poker users** and had just launched a sports platform. Only about **1% of the poker base** had converted to sports.',
    },
    {
      type: 'paragraph',
      text: 'That is a massive audience and a tiny crossover.',
    },
    {
      type: 'paragraph',
      text: 'They saw BetBolt as a potential solution: a sportsbook experience simple enough for recreational poker players — people who liked games, risk and quick decisions, but did not want a traditional busy book.',
    },
    {
      type: 'paragraph',
      text: 'The fit made sense on paper. BetBolt was not trying to win the serious bettor. It was trying to turn sports betting into something intuitive, playful and familiar.',
    },
    { type: 'heading', level: 2, text: 'When Talks Fell Through' },
    {
      type: 'paragraph',
      text: 'Unfortunately, during that period **William Hill acquired Amaya**, and the conversations stopped.',
    },
    {
      type: 'paragraph',
      text: 'BetBolt never went to market in the way we had planned. Like a lot of founder ideas, it lived most fully in the pitch, the product deck and the prototype — and in the conversations that almost turned it into something bigger.',
    },
    { type: 'heading', level: 2, text: 'What It Taught Me' },
    {
      type: 'paragraph',
      text: 'BetBolt taught me to design for **behaviour**, not just interface.',
    },
    {
      type: 'paragraph',
      text: 'Recreational players do not want more markets. They want **confidence, simplicity and a reason to act now**. Timers, single-focus cards and plain language are product decisions — not decoration.',
    },
    {
      type: 'paragraph',
      text: 'It also taught me how powerful cross-sell becomes when the core experience has a clear focal point. And how much language matters when you are trying to move users between sportsbook and casino without breaking the spell.',
    },
    {
      type: 'paragraph',
      text: 'Years later, a lot of gambling products still feel built for experts. BetBolt was my attempt to build for everyone else — and to make betting feel like a game worth playing.',
    },
  ],
};
