import NextAuth, { User } from "next-auth";
import authConfig from "./auth.config";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "./lib/mongodb";
import { IUser } from "./@types/next-auth";
import { ObjectId } from "mongodb";

const adapter = MongoDBAdapter(clientPromise);

async function addAdditionalFields(user: User) {
  const db = (await clientPromise).db();
  await db
    .collection("users")
    .updateOne(
      { _id: new ObjectId(user.id) },
      { $set: { createdAt: new Date(), role: "user" } }
    );
}

export const { handlers, auth, signIn, signOut, unstable_update } = NextAuth({
  ...authConfig,
  //@ts-ignore
  adapter,
  session: { strategy: "jwt" },
  callbacks: {
    async session({ session, token, user }) {
      session.user = token.user as IUser;
      return session;
    },
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.user = user;
      }
      if (trigger === "update" && session) {
        token = { ...token, user: session };
        return token;
      }
      return token;
    },
    async signIn({ user, account, profile, email, credentials }) {
      // Add the createdAt field only if the user is new
      if (user.createdAt === undefined) {
        await addAdditionalFields(user);
      }
      return true;
    },
  },
});
