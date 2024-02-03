export type Following = {
  id: number;
  full_name?: string;
  username?: string;
  userId: {
    id: number;
  };
};

export type User = {
  photo_profile: string;
  id: number;
  full_name?: string;
  username?: string;
  email?: string;
  picture?: string;
  bio?: string;
  following?: Following[];
  followers?: Following[];
  numfollowers: 0;
  numfollowing: 0;
};

export type follow = {
  id: number;
  userId: {
    id: number;
  };
};

export type UserRegister = {
  full_name: string;
  username: string;
  email: string;
  password: string;
};

export type Userlogin = {
  email: string;
  password: string;
};
