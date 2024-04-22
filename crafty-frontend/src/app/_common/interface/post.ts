import { User } from './user';

export interface Post {
  id: string;
  title: string;
  detail: string;
  content: string;
  price: number;
  photoUrl: string;
  priority: number;
  reviews: Review[];
  userFavorite: User[];
  ownerId?: string;

  isBanned: boolean;
}

export interface Package {
  Price: number;
}

export interface Review {
  id: string;
  desc: string;
  sender: string;
  rate: number;
  postId: string;
}

export interface Thumbnail {
  ThumbnailUrl: string;
  //   TODO: change to enum with backend
  ThumbnailType: string;
}
