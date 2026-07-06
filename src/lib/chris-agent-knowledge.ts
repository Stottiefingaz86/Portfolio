import { BLOG_POSTS } from '@/lib/blog-posts';
import type { BlogBlock } from '@/lib/blog-types';
import {
  ABOUT,
  AI_MILESTONES,
  CASE_STUDIES,
  DESIGN_LEADERSHIP,
  GAMBLING_EXPERTISE,
  JURNII_STORY,
  LEADERSHIP_PHILOSOPHY,
  SITE,
  TESTIMONIALS,
  TIMELINE,
  WHAT_I_BRING,
} from '@/lib/portfolio-data';

function blocksToText(blocks: BlogBlock[]) {
  return blocks
    .map((block) => {
      switch (block.type) {
        case 'paragraph':
          return block.text;
        case 'heading':
          return `${'#'.repeat(block.level)} ${block.text}`;
        case 'list':
          return block.items.map((item) => `- ${item}`).join('\n');
        case 'callout':
          return block.text;
        case 'video':
          return block.caption ?? block.title ?? `YouTube: ${block.youtubeId}`;
        default:
          return '';
      }
    })
    .filter(Boolean)
    .join('\n\n');
}

function buildCaseStudiesKnowledge() {
  return CASE_STUDIES.map((study) => {
    const stages = study.stages
      ?.map((stage) => `${stage.title}: ${stage.items.join('; ')}`)
      .join('\n');

    return [
      `### ${study.title}`,
      `Client: ${study.client}`,
      `Scope: ${study.scope}`,
      `Outcome: ${study.outcome}`,
      `Summary: ${study.summary}`,
      `Context: ${study.context}`,
      `Problem: ${study.problem}`,
      `My role: ${study.myRole}`,
      `What changed: ${study.whatChanged}`,
      `Decisions: ${study.decisions}`,
      `Impact: ${study.impact}`,
      `Leadership signal: ${study.leadership}`,
      stages ? `Stages:\n${stages}` : '',
    ]
      .filter(Boolean)
      .join('\n');
  }).join('\n\n---\n\n');
}

export function buildChrisAgentSystemPrompt() {
  const timeline = TIMELINE.map(
    (entry) =>
      `${entry.phase} — ${entry.role} at ${entry.company} (${entry.location}): ${entry.summary}`,
  ).join('\n');

  const testimonials = TESTIMONIALS.items
    .map(
      (item) =>
        `${item.name}, ${item.role} · ${item.company}: "${item.quote}"${item.context ? ` (${item.context})` : ''}`,
    )
    .join('\n\n');

  const expertise = WHAT_I_BRING.map(
    (card) => `${card.title}: ${card.body} Focus: ${card.focus.join(', ')}`,
  ).join('\n\n');

  const verticals = GAMBLING_EXPERTISE.verticals
    .map((item) => `${item.label}: ${item.detail}`)
    .join('\n');

  const principles = DESIGN_LEADERSHIP.principles
    .map((item) => `${item.title}: ${item.body}`)
    .join('\n');

  const blog = BLOG_POSTS.map(
    (post) => `## ${post.title}\n${post.excerpt}\n${blocksToText(post.blocks)}`,
  ).join('\n\n---\n\n');

  const aiMilestones = AI_MILESTONES.map(
    (item) => `${item.title} (${item.phase}): ${item.summary} Stack: ${item.stack.join(', ')}`,
  ).join('\n');

  return `You are Chris Agent — an AI interview assistant for Christopher Hunt's portfolio site.

You speak as Christopher Hunt in the first person, in a clear, direct, interview-ready tone: confident but not arrogant, craft-led, commercially aware, and specific. You are speaking to recruiters, hiring managers, design leaders, and product leaders who want to interview Chris.

## Rules
- Answer only from the knowledge base below. Do not invent employers, metrics, clients, or projects.
- If something is not covered, say you would rather discuss it directly and point people to the contact form on the site.
- Keep answers focused: usually 2–4 short paragraphs unless the interviewer asks for depth.
- Lead with the strongest signal for the question — leadership, iGaming depth, systems thinking, AI, or founder experience.
- You may reference case studies, timeline, and testimonials naturally, as Chris would in conversation.
- Do not mention being an AI unless asked. Present as "Chris Agent" — Chris's knowledge, available to answer interview questions on the portfolio.

## Identity
Name: Christopher Hunt
Role: ${SITE.tagline}
Location: ${SITE.location}
LinkedIn: ${SITE.linkedin}
Contact: Use the contact form on the portfolio site.

## Hero summary
${SITE.heroLead}
${SITE.heroBody}

## About
${ABOUT.lead}
${ABOUT.personal}

Persona focus: ${ABOUT.persona.focus}
Traits: ${ABOUT.persona.traits.join(', ')}
Goals: ${ABOUT.persona.goals.join('; ')}

## Leadership philosophy
${LEADERSHIP_PHILOSOPHY.title}
${LEADERSHIP_PHILOSOPHY.body}

## Design leadership principles
${principles}
${DESIGN_LEADERSHIP.philosophy.lead}
${DESIGN_LEADERSHIP.philosophy.body}

## iGaming expertise
${GAMBLING_EXPERTISE.intro}
${verticals}

## What I bring
${expertise}

## Jurnii & AI work
${JURNII_STORY.lead}
${JURNII_STORY.jurnii.body}
${JURNII_STORY.designToDev.body}
${JURNII_STORY.designToDev.pillars.map((item) => `- ${item.label}: ${item.detail}`).join('\n')}

## AI milestones
${aiMilestones}

## Career timeline
${timeline}

## Case studies
${buildCaseStudiesKnowledge()}

## Testimonials
${testimonials}

## Blog / background stories
${blog}
`.trim();
}

export const CHRIS_AGENT_STARTER_PROMPTS = [
  'How do you lead design in a complex gambling organisation?',
  'Tell me about the BetOnline product transformation',
  'What is your approach to design systems and governance?',
  'How do you use AI in design-to-dev workflows?',
  'Why did you found Jurnii AI?',
] as const;

export const CHRIS_AGENT_GREETING =
  "Hi — I'm Chris Agent. Interview me on anything here: leadership, BetOnline, design systems, Jurnii, AI workflows, or iGaming product depth.";
