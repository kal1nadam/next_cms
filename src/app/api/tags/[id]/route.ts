import { NextResponse } from 'next/server';
import { prisma } from '@/app/prisma/client';

type Props = {
  params: Promise<{
    id: string
  }>
}

export async function DELETE(req: Request, { params }: Props) {
  const resolvedParams = await params;
  try {
    const tagId = parseInt(resolvedParams.id);
    
    if (!tagId) {
      return NextResponse.json({ error: 'Tag ID is required' }, { status: 400 });
    }

    // Check if the tag exists before deleting
    const existingTag = await prisma.tag.findUnique({
      where: { id: tagId },
    });

    if (!existingTag) {
      return NextResponse.json({ error: 'Tag not found' }, { status: 404 });
    }

    await prisma.tag.delete({
      where: { id: tagId },
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Error deleting tag:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
