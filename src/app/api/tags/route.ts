// import { prisma } from '@/app/prisma/client';
// import { NextResponse } from 'next/server';

// export async function POST(request: Request) {

//   const data = await request.json();
//   const tag = await prisma.tag.create({
//     data: {
//       name: data.name
//     },
//   });
//   return NextResponse.json(tag);
// }

import { NextResponse } from 'next/server';
import { prisma } from '@/app/prisma/client';

export async function GET() {
  const tags = await prisma.tag.findMany({ orderBy: { name: 'asc' } });
  return NextResponse.json(tags);
}

export async function POST(req: Request) {
    const { name } = await req.json();
    if (!name.trim()) return NextResponse.json({ error: 'Name required' }, { status: 400 });
  
    const tag = await prisma.tag.create({ data: { name } });
    return NextResponse.json(tag, { status: 201 });
  }
  

