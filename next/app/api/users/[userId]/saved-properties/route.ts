import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const { userId } = await params;
    const savedProperties = await prisma.savedProperty.findMany({
      where: { userId },
      include: {
        property: {
          include: { agent: true },
        },
      },
    });
    return NextResponse.json(savedProperties);
  } catch (error) {
    console.error('Error fetching saved properties:', error);
    return NextResponse.json({ error: 'Failed to fetch saved properties' }, { status: 500 });
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const { userId } = await params;
    const body = await request.json();
    const { propertyId } = body;
    const savedProperty = await prisma.savedProperty.create({
      data: { userId, propertyId },
      include: { property: true },
    });
    return NextResponse.json(savedProperty, { status: 201 });
  } catch (error) {
    console.error('Error saving property:', error);
    return NextResponse.json({ error: 'Failed to save property' }, { status: 500 });
  }
}
