// src/auth/auth.ts
import authOptions from "@/utils/auth.options";
import { getServerSession } from "next-auth/next";

export async function getSession() {
  return await getServerSession(authOptions);
}