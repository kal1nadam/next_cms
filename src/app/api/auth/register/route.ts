import { NextResponse } from 'next/server';
import { prisma } from '@/app/prisma/client';
import { hashPassword } from '@/app/utils/bcryptUtils';

export async function POST(request: Request) {
  const { email, password, name } = await request.json();
  
  // Validate required fields.
  if (!email || !password || !name) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  // Check if a user with the given email already exists.
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    return NextResponse.json({ error: 'User already exists' }, { status: 400 });
  }

  // Hash the password.
  const passwordHash = await hashPassword(password);

  // Create the new user.
  const newUser = await prisma.user.create({
    data: {
      email,
      name,
      passwordHash,
    },
  });

  return NextResponse.json(newUser, { status: 201 });
}
