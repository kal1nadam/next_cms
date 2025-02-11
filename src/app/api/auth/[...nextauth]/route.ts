import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { comparePassword } from "@/app/utils/bcryptUtils";
import { AuthOptions } from "next-auth";
import { prisma } from "@/app/prisma/client";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required.");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user || !(await comparePassword(credentials.password, user.passwordHash))) {
          throw new Error("Invalid email or password.");
        }

        // console.log("user", user);
        return { id: user.id, email: user.email, name: user.name };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ session, token }) {
      // Here we add the id from the token (token.sub) to the session
      session.user = {
        id: token.sub as string,
        email: token.email as string,
        name: token.name as string,
        image: token.picture as string,
      };
    //   console.log("session GEEEET", session);
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
