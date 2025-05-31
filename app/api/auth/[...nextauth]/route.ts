import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";

const authOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
      authorization: { params: { scope: "read:user user:email" } }, // ensure email scope
      profile(profile) {
        return {
          id: profile.id.toString(),
          name: profile.name || profile.login, // fallback to username if no name
          email: profile.email,
          image: profile.avatar_url,
          username: profile.login, // add GitHub username
        };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session, token }: { session: any; token: any }) {
      // Pass username to the session object
      if (session.user) {
        session.user.username = token.username;
      }
      return session;
    },
    async jwt({ token, profile }: { token: any; profile?: any }) {
      if (profile) {
        token.username = profile.login;
      }
      return token;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
