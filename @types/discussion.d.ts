export interface IDiscussion {
  _id: string;
  title: string;
  content: string;
  user: {
    _id: string;
    name: string;
    image?: string;
    email: string;
  };
  createdAt: string;
  updatedAt: string;
  pinned: boolean;
  category: string;
  closed: boolean;
  featured?: boolean;
  answers: {
    _id: string;
    content: string;
    user: {
      name: string;
      image?: string;
      email: string;
    };
    createdAt: string;
    updatedAt: string;
  }[];
}
