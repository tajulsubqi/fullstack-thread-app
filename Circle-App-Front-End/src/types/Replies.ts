import { User } from './User';

export type FormReply = {
  content: string;
  image?: Blob | MediaSource | string;
  threadId: number;
};

export type RepliesCard = {
  id?: number;
  content?: string;
  image?: string;
  created_at?: string;
  likes: [];
  replies: [];
  createdById: User;
};
