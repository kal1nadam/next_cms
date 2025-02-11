import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ["query"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

// src/lib/prisma.ts
// Initialize and export the Prisma client for use in server components and API routes

// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// export default prisma;