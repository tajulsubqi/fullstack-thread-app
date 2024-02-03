import { User } from './User';

export type FormThread = {
  content: string;
  image?: Blob | MediaSource | string;
};

export type likes = {
  id: number;
  userId: {
    id: number;
  };
};

export type IThreadCard = {
  id?: number;
  content?: string;
  image?: string;
  created_at?: string;
  likes: [];
  replies: [];
  username?: string;
  full_name?: string;
  createdById?: User;
};
