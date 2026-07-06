import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';

import { buildChrisAgentSystemPrompt } from '@/lib/chris-agent-knowledge';

export const maxDuration = 45;

type AgentMessage = {
  role: 'user' | 'assistant';
  content: string;
};

export async function POST(request: Request) {
  if (!process.env.OPENAI_API_KEY) {
    return Response.json(
      { error: 'Chris Agent is not configured. Add OPENAI_API_KEY to the environment.' },
      { status: 503 },
    );
  }

  let messages: AgentMessage[] = [];

  try {
    const body = (await request.json()) as { messages?: AgentMessage[] };
    messages = Array.isArray(body.messages) ? body.messages : [];
  } catch {
    return Response.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const sanitized = messages
    .filter(
      (message): message is AgentMessage =>
        (message.role === 'user' || message.role === 'assistant') &&
        typeof message.content === 'string' &&
        message.content.trim().length > 0,
    )
    .slice(-16);

  if (!sanitized.length || sanitized[sanitized.length - 1]?.role !== 'user') {
    return Response.json({ error: 'A user message is required.' }, { status: 400 });
  }

  const result = streamText({
    model: openai('gpt-4o-mini'),
    system: buildChrisAgentSystemPrompt(),
    messages: sanitized,
    temperature: 0.55,
    maxOutputTokens: 900,
  });

  return result.toTextStreamResponse();
}
