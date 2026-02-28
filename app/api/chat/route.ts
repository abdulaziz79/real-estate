import { NextRequest, NextResponse } from 'next/server';
import { chatWithAssistant } from '@/services/geminiService';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, context } = body as { message?: string; context?: string };
    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'message is required' }, { status: 400 });
    }
    const response = await chatWithAssistant(message, context);
    return NextResponse.json({ text: response });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'I\'m having trouble connecting right now. Please try again later.' },
      { status: 500 }
    );
  }
}
