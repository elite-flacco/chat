import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import Anthropic from '@anthropic-ai/sdk';
import { ChatRequest, Message } from '@/types/chat';

const openai = process.env.OPENAI_API_KEY
  ? new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    })
  : null;

const anthropic = process.env.ANTHROPIC_API_KEY
  ? new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    })
  : null;

export async function POST(request: NextRequest) {
  try {
    const body: ChatRequest = await request.json();
    const { messages, model, tools } = body;

    if (model.provider === 'openai') {
      return await handleOpenAIRequest(messages, model, tools);
    } else if (model.provider === 'anthropic') {
      return await handleAnthropicRequest(messages, model, tools);
    }

    return NextResponse.json(
      { error: 'Unsupported model provider' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

async function handleOpenAIRequest(
  messages: Message[],
  model: any,
  _tools: any[]
) {
  try {
    if (!openai) {
      return NextResponse.json(
        { error: 'OpenAI API key not configured' },
        { status: 500 }
      );
    }

    const openaiMessages = messages.map(msg => ({
      role: msg.role as 'user' | 'assistant',
      content: msg.content,
    }));

    const response = await openai.chat.completions.create({
      model: model.name,
      messages: openaiMessages,
      temperature: 0.7,
    });

    const assistantMessage: Message = {
      id: Date.now().toString(),
      role: 'assistant',
      content: response.choices[0]?.message?.content || 'No response',
      timestamp: new Date(),
    };

    return NextResponse.json({ message: assistantMessage });
  } catch (error: any) {
    console.error('OpenAI API error:', error);

    let errorMessage = 'OpenAI API error';
    if (error?.error?.message) {
      errorMessage = error.error.message;
    } else if (error?.message) {
      errorMessage = error.message;
    }

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

async function handleAnthropicRequest(
  messages: Message[],
  model: any,
  _tools: any[]
) {
  try {
    if (!anthropic) {
      return NextResponse.json(
        { error: 'Anthropic API key not configured' },
        { status: 500 }
      );
    }

    const anthropicMessages = messages
      .filter(msg => msg.role === 'user' || msg.role === 'assistant')
      .map(msg => ({
        role: msg.role as 'user' | 'assistant',
        content: msg.content,
      }));

    const response = await anthropic.messages.create({
      model: model.name,
      max_tokens: 4000,
      messages: anthropicMessages,
    });

    const content = response.content[0];
    const responseText = content.type === 'text' ? content.text : 'No response';

    const assistantMessage: Message = {
      id: Date.now().toString(),
      role: 'assistant',
      content: responseText,
      timestamp: new Date(),
    };

    return NextResponse.json({ message: assistantMessage });
  } catch (error: any) {
    console.error('Anthropic API error:', error);

    let errorMessage = 'Anthropic API error';
    if (error?.error?.message) {
      errorMessage = error.error.message;
    } else if (error?.message) {
      errorMessage = error.message;
    }

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
