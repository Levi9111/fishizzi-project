import { Account } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';
import { Session } from 'next-auth';

import { JWT } from 'next-auth/jwt';

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, account }: { token: JWT; account: Account | null }) {
      if (account) {
        token.provider = account.provider;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (session && session.user) {
        // @ts-expect-error session.user is not null
        session.user.id = token.sub as string;
        // @ts-expect-error session.user is not null
        session.user.provider = token.provider as string;
      }
      return session;
    },
  },
};
