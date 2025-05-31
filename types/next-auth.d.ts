import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      email?: string | null;
      username?: string;
      id?: string;
    } & DefaultSession["user"];
  }
}
