export interface IMessage {
  _id: string;
  content: string;
  user: {
    _id: string;
    name: string;
    image?: string;
    email: string;
    role: string;
  };
  timestamp: Date;
}
