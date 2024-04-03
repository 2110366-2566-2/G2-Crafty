import { User } from '../interface/user';

export const getIsFavorite = (userFavorite: User[], userId: string) => {
  return userFavorite.some((favorite) => favorite.id === userId);
};
