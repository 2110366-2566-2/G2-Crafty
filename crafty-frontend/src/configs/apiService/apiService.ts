import axios from 'axios';
import { LoginResponse } from './interface';
import { ApiResponseType, ApiStatus } from './types';
import { Post } from '@/app/_common/interface/post';
import { User } from '@/app/_common/interface/user';
import { apiClient } from '../axiosConfig';

class ApiService {
  constructor() {
    axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_ENDPOINT || 'http://localhost:5000';
  }
  setToken = (token: string) => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  };

  login = async (username: string, password: string): Promise<ApiResponseType<LoginResponse>> => {
    try {
      const response = await apiClient.post('/auth/login', { username, password });
      this.setToken(response.data.token);

      localStorage.setItem('user', JSON.stringify(response.data.user));
      localStorage.setItem('token', response.data.token);

      return {
        status: ApiStatus.SUCCESS,
        data: response.data,
      };
    } catch {
      return {
        status: ApiStatus.ERROR,
        errorMessage: 'Invalid username or password',
      };
    }
  };

  loginWithFirebaseToken = async (
    firebaseToken: string
  ): Promise<ApiResponseType<LoginResponse>> => {
    try {
      const response = await apiClient.post('/auth/login/firebase', { token: firebaseToken });
      this.setToken(response.data.token);

      localStorage.setItem('user', JSON.stringify(response.data.user));
      localStorage.setItem('token', response.data.token);

      return {
        status: ApiStatus.SUCCESS,
        data: response.data,
      };
    } catch {
      return {
        status: ApiStatus.ERROR,
        errorMessage: 'Invalid firebase token',
      };
    }
  };

  registerWithFirebaseToken = async (
    firebaseToken: string
    // TODO: add other field here to create user with data
  ): Promise<ApiResponseType<LoginResponse>> => {
    try {
      // TODO: add other field here to create user with data
      const response = await apiClient.post('/auth/register/firebase', { token: firebaseToken });
      this.setToken(response.data.token);

      localStorage.setItem('user', JSON.stringify(response.data.user));
      localStorage.setItem('token', response.data.token);

      return {
        status: ApiStatus.SUCCESS,
        data: response.data,
      };
    } catch {
      return {
        status: ApiStatus.ERROR,
        errorMessage: 'Invalid firebase token',
      };
    }
  };

  getMe = async (): Promise<ApiResponseType<User>> => {
    try {
      const response = await apiClient.get('/auth/me');
      return {
        status: ApiStatus.SUCCESS,
        data: response.data,
      };
    } catch {
      return {
        status: ApiStatus.ERROR,
        errorMessage: 'Failed to fetch user',
      };
    }
  };

  getPosts = async (): Promise<ApiResponseType<Post[]>> => {
    try {
      const response = await apiClient.get('/posts');
      return {
        status: ApiStatus.SUCCESS,
        data: response.data,
      };
    } catch {
      return {
        status: ApiStatus.ERROR,
        errorMessage: 'Failed to fetch posts',
      };
    }
  };

  getPost = async (id: string): Promise<ApiResponseType<Post>> => {
    try {
      const response = await apiClient.get(`/posts/${id}`);
      return {
        status: ApiStatus.SUCCESS,
        data: response.data,
      };
    } catch {
      return {
        status: ApiStatus.ERROR,
        errorMessage: 'Failed to fetch post',
      };
    }
  };

  getMyPosts = async (): Promise<ApiResponseType<Post[]>> => {
    try {
      const response = await apiClient.get('/posts/me');
      return {
        status: ApiStatus.SUCCESS,
        data: response.data,
      };
    } catch {
      return {
        status: ApiStatus.ERROR,
        errorMessage: 'Failed to fetch posts',
      };
    }
  };

  updatePost = async (id: string, post: Partial<Post>): Promise<ApiResponseType<Post>> => {
    try {
      const response = await apiClient.patch(`/posts/${id}`, post);
      return {
        status: ApiStatus.SUCCESS,
        data: response.data,
      };
    } catch {
      return {
        status: ApiStatus.ERROR,
        errorMessage: 'Failed to update post',
      };
    }
  };

  boostPost = async (id: string): Promise<ApiResponseType<Post>> => {
    try {
      const response = await apiClient.patch(`/posts/${id}/boosting`);
      return {
        status: ApiStatus.SUCCESS,
        data: response.data,
      };
    } catch {
      return {
        status: ApiStatus.ERROR,
        errorMessage: 'Failed to boost post',
      };
    }
  };

  favoritePost = async (feedId: string, userId: string): Promise<ApiResponseType<Post>> => {
    try {
      const response = await apiClient.post(`/posts/${feedId}/addfavorites`, { userId });
      return {
        status: ApiStatus.SUCCESS,
        data: response.data,
      };
    } catch {
      return {
        status: ApiStatus.ERROR,
        errorMessage: 'Failed to favorite post',
      };
    }
  };

  unfavoritePost = async (feedId: string, userId: string): Promise<ApiResponseType<Post>> => {
    try {
      const response = await apiClient.post(`/posts/${feedId}/unfavorites`, { userId });
      return {
        status: ApiStatus.SUCCESS,
        data: response.data,
      };
    } catch {
      return {
        status: ApiStatus.ERROR,
        errorMessage: 'Failed to unfavorite post',
      };
    }
  };

  deleteUser = async (userId: string): Promise<ApiResponseType<User>> => {
    try {
      const response = await apiClient.delete(`/users/${userId}`);
      return {
        status: ApiStatus.SUCCESS,
        data: response.data,
      };
    } catch {
      return {
        status: ApiStatus.ERROR,
        errorMessage: 'Failed to delete user',
      };
    }
  };
}

export const apiService = new ApiService();
