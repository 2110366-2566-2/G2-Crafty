import { User } from '@/app/_common/interface/user';

export type LoginResponse = {
  user: User;
  token: string;
};
