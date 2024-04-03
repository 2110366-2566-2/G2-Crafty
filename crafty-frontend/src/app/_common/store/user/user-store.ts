import { create } from 'zustand';
import { User } from '../../interface/user';
import { apiService } from '@/configs/apiService/apiService';
import { ApiStatus } from '@/configs/apiService/types';

interface IUserStore {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  isUserInit: boolean;
  isAuth: boolean;
  user: User;
  token: string;
  initUser: () => void;
  login: (username: string, password: string) => Promise<boolean>;
}

const userStore = create<IUserStore>((set) => ({
  isLoading: false,
  setIsLoading: (isLoading: boolean) => set({ isLoading }),
  isUserInit: false,
  isAuth: false,
  user: {} as User,
  token: '',

  initUser: () => {
    if (userStore.getState().isLoading || userStore.getState().isUserInit) return;
    if (typeof window === 'undefined') return;
    set({ isLoading: true });
    const userInStorage = localStorage.getItem('user');
    const user =
      userInStorage && userInStorage !== 'undefined' ? JSON.parse(userInStorage) : undefined;
    const token = localStorage.getItem('token') ?? '';
    if (user) {
      apiService.setToken(token);
      set({ isUserInit: true, isAuth: true, user, token, isLoading: false });
    } else {
      set({ isUserInit: true, isLoading: false });
    }
  },

  login: async (username: string, password: string) => {
    const response = await apiService.login(username, password);
    if (response.status === ApiStatus.ERROR) return false;
    set({ isAuth: true, user: response.data.user });

    localStorage.setItem('user', JSON.stringify(response.data.user));
    localStorage.setItem('token', response.data.token);
    return true;
  },
}));

export default userStore;
