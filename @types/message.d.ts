export interface IMessage {
  _id: string;
  content: string;
  user: {
    name: string;
    image?: string;
    email: string;
  };
  timestamp: Date;
}
