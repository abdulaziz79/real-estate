import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const receiverId = searchParams.get('receiverId');
    const messages = await prisma.message.findMany({
      where: {
        OR: [
          { senderId: userId!, receiverId: receiverId! },
          { senderId: receiverId!, receiverId: userId! },
        ],
      },
      orderBy: { timestamp: 'asc' },
    });
    return NextResponse.json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const message = await prisma.message.create({
      data: body,
    });
    return NextResponse.json(message, { status: 201 });
  } catch (error) {
    console.error('Error creating message:', error);
    return NextResponse.json({ error: 'Failed to create message' }, { status: 500 });
  }
}
