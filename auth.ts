import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "./lib/mongodb";
import { IUser } from "./@types/next-auth";

export const { handlers, auth, signIn, signOut, unstable_update } = NextAuth({
  //@ts-ignore
  adapter: MongoDBAdapter(clientPromise),
  session: { strategy: "jwt" },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = (user as IUser).id;
        token.role = (user as IUser).role;
        token.bio = (user as IUser).bio;
      }
      return token;
    },
    session({ session, token }) {
      session.user.id = token.id as string;
      session.user.role = token.role as string;
      session.user.bio = token.bio as string;
      return session;
    },
  },
  ...authConfig,
});
