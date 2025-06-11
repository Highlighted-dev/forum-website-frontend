declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      image: string;
      role: string;
      bio: string;
      emailVerified: Date | null;
      createdAt: Date;
    };
  }
  interface User extends IUser {}
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  image: string;
  role: string;
  bio: string;
  emailVerified: Date | null;
  createdAt: Date;
}
