export interface IDiscussion {
  _id: string;
  title: string;
  content: string;
  username: string;
  createdAt: string;
  updatedAt: string;
  pinned: boolean;
  answers: any[];
}
