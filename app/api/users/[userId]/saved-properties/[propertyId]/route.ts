import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ userId: string; propertyId: string }> }
) {
  try {
    const { userId, propertyId } = await params;
    await prisma.savedProperty.deleteMany({
      where: { userId, propertyId },
    });
    return NextResponse.json({ message: 'Property unsaved successfully' });
  } catch (error) {
    console.error('Error unsaving property:', error);
    return NextResponse.json({ error: 'Failed to unsave property' }, { status: 500 });
  }
}
