import { IUser } from "./next-auth";

export interface IDiscussion {
  _id: string;
  title: string;
  content: string;
  user: {
    _id: string;
    name: string;
    image?: string;
    email: string;
    role: string;
  };
  createdAt: string;
  updatedAt: string;
  pinned: boolean;
  category: string;
  closed: boolean;
  featured?: boolean;
  reactions: {
    _id: string;
    user: IUser;
    reaction: string;
  }[];
  answers: {
    _id: string;
    content: string;
    user: {
      name: string;
      image?: string;
      email: string;
      role: string;
    };
    reactions: {
      _id: string;
      user: IUser;
      reaction: string;
    }[];
    createdAt: string;
    updatedAt: string;
  }[];
}
