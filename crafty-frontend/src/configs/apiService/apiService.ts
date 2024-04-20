import axios from 'axios';
import { LoginResponse } from './interface';
import { ApiResponseType, ApiStatus } from './types';
import { Post } from '@/app/_common/interface/post';
import { User } from '@/app/_common/interface/user';
import { apiV2Client } from '../axiosConfig';
import {
  ChatroomDetail,
  Message,
  PayDetail,
  PostChatroom,
  PostMessage,
  ProductDetail,
  ReadChatroom,
} from '@/app/_common/interface/chat';
import { ProductHistory } from '@/app/_common/interface/product-history';

class ApiService {
  constructor() {
    axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_ENDPOINT || 'http://localhost:5000';
  }
  setToken = (token: string) => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  };

  login = async (username: string, password: string): Promise<ApiResponseType<LoginResponse>> => {
    try {
      const response = await apiV2Client.post('/auth/login', { username, password });
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
      const response = await apiV2Client.post('/auth/login/firebase', { token: firebaseToken });
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
      const response = await apiV2Client.post('/auth/register/firebase', { token: firebaseToken });
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
      const response = await apiV2Client.get('/auth/me');
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

  getPosts = async (search?: string): Promise<ApiResponseType<Post[]>> => {
    try {
      const response = await apiV2Client.get('/posts', { params: { search } });
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
      const response = await apiV2Client.get(`/posts/${id}`);
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
      const response = await apiV2Client.get('/posts/me');
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

  createPost = async (post: Partial<Post>): Promise<ApiResponseType<Post>> => {
    try {
      const response = await axios.post('/posts', post);
      return {
        status: ApiStatus.SUCCESS,
        data: response.data,
      };
    } catch {
      return {
        status: ApiStatus.ERROR,
        errorMessage: 'Failed to create post',
      };
    }
  };

  updatePost = async (id: string, post: Partial<Post>): Promise<ApiResponseType<Post>> => {
    try {
      const response = await apiV2Client.patch(`/posts/${id}`, post);
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
      const response = await apiV2Client.patch(`/posts/${id}/boosting`);
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
      const response = await apiV2Client.post(`/posts/${feedId}/addfavorites`, { userId });
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
      const response = await apiV2Client.post(`/posts/${feedId}/unfavorites`, { userId });
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
      const response = await apiV2Client.delete(`/users/${userId}`);
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

  getmyName = async (): Promise<ApiResponseType<String>> => {
    try {
      const response = await apiV2Client.get(`/auth/me`);
      return {
        status: ApiStatus.SUCCESS,
        data: response.data.username,
      };
    } catch {
      return {
        status: ApiStatus.ERROR,
        errorMessage: 'Failed to fetch user',
      };
    }
  };

  getChatrooms = async (): Promise<ApiResponseType<ReadChatroom[]>> => {
    try {
      const response = await apiV2Client.get(`/chats`);
      return {
        status: ApiStatus.SUCCESS,
        data: response.data,
      };
    } catch {
      return {
        status: ApiStatus.ERROR,
        errorMessage: 'Failed to fetch chatrooms',
      };
    }
  };

  getChatroomDetail = async (chatroomId: string): Promise<ApiResponseType<ChatroomDetail>> => {
    try {
      const response = await apiV2Client.get(`/chats/${chatroomId}`);
      return {
        status: ApiStatus.SUCCESS,
        data: response.data,
      };
    } catch {
      return {
        status: ApiStatus.ERROR,
        errorMessage: 'Failed to fetch chatroom detail',
      };
    }
  };

  createNewMessage = async (postMessage: PostMessage): Promise<ApiResponseType<Message>> => {
    try {
      const response = await apiV2Client.post(`/chats/message`, postMessage);
      return {
        status: ApiStatus.SUCCESS,
        data: response.data,
      };
    } catch {
      return {
        status: ApiStatus.ERROR,
        errorMessage: 'Failed to create new message',
      };
    }
  };

  createNewChatroom = async (
    postChatroom: PostChatroom
  ): Promise<ApiResponseType<ReadChatroom>> => {
    try {
      const response = await apiV2Client.post(`/chats/chatroom`, postChatroom);
      return {
        status: ApiStatus.SUCCESS,
        data: response.data,
      };
    } catch {
      return {
        status: ApiStatus.ERROR,
        errorMessage: 'Failed to create new chatroom',
      };
    }
  };

  getProductDetail = async (productId: string): Promise<ApiResponseType<ProductDetail>> => {
    try {
      const response = await apiV2Client.get(`/products/${productId}`);
      return {
        status: ApiStatus.SUCCESS,
        data: response.data,
      };
    } catch {
      return {
        status: ApiStatus.ERROR,
        errorMessage: 'Failed to fetch product detail',
      };
    }
  };

  createNewProduct = async (
    product: Partial<ProductDetail>
  ): Promise<ApiResponseType<ProductDetail>> => {
    try {
      const response = await apiV2Client.post('/products', product);
      return {
        status: ApiStatus.SUCCESS,
        data: response.data,
      };
    } catch {
      return {
        status: ApiStatus.ERROR,
        errorMessage: 'Failed to create product',
      };
    }
  };

  deleteProduct = async (productId: string): Promise<ApiResponseType<ProductDetail>> => {
    try {
      const response = await apiV2Client.delete(`/products/${productId}`);
      return {
        status: ApiStatus.SUCCESS,
        data: response.data,
      };
    } catch {
      return {
        status: ApiStatus.ERROR,
        errorMessage: 'Failed to delete product',
      };
    }
  };

  incrementProductStep = async (productId: string): Promise<ApiResponseType<ProductDetail>> => {
    try {
      const response = await apiV2Client.patch(`/products/${productId}`, { incrementStep: true });
      return {
        status: ApiStatus.SUCCESS,
        data: response.data,
      };
    } catch {
      return {
        status: ApiStatus.ERROR,
        errorMessage: 'Failed to increment product step',
      };
    }
  };

  pay = async (payDetail: PayDetail): Promise<ApiResponseType<ProductDetail>> => {
    try {
      const response = await apiV2Client.post(`/products/pay`, payDetail);
      return {
        status: ApiStatus.SUCCESS,
        data: response.data,
      };
    } catch {
      return {
        status: ApiStatus.ERROR,
        errorMessage: 'Payment Failed',
      };
    }
  };

  adminGetUsers = async (): Promise<ApiResponseType<User[]>> => {
    try {
      const response = await apiV2Client.get('/users');
      return {
        status: ApiStatus.SUCCESS,
        data: response.data,
      };
    } catch {
      return {
        status: ApiStatus.ERROR,
        errorMessage: 'Failed to fetch users',
      };
    }
  };

  banPostById = async (id: string): Promise<ApiResponseType<Post>> => {
    try {
      const response = await apiV2Client.patch(`/posts/${id}/banning`);
      return {
        status: ApiStatus.SUCCESS,
        data: response.data,
      };
    } catch {
      return {
        status: ApiStatus.ERROR,
        errorMessage: 'Failed to ban post',
      };
    }
  };

  unbanPostById = async (id: string): Promise<ApiResponseType<Post>> => {
    try {
      const response = await apiV2Client.patch(`/posts/${id}/unbanning`);
      return {
        status: ApiStatus.SUCCESS,
        data: response.data,
      };
    } catch {
      return {
        status: ApiStatus.ERROR,
        errorMessage: 'Failed to unban post',
      };
    }
  };

  adminGetPosts = async (search?: string): Promise<ApiResponseType<Post[]>> => {
    try {
      const response = await apiV2Client.get('/posts/all-admin', { params: { search } });
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

  adminGetProductHistory = async (): Promise<ApiResponseType<ProductHistory[]>> => {
    try {
      const response = await apiV2Client.get('/products/history');
      return {
        status: ApiStatus.SUCCESS,
        data: response.data,
      };
    } catch {
      return {
        status: ApiStatus.ERROR,
        errorMessage: 'Failed to fetch product history',
      };
    }
  };

  getUsers = async (): Promise<ApiResponseType<User[]>> => {
    try {
      const response = await apiV2Client.get('/users');
      return {
        status: ApiStatus.SUCCESS,
        data: response.data,
      };
    } catch {
      return {
        status: ApiStatus.ERROR,
        errorMessage: 'Failed to fetch users',
      };
    }
  };

  reviewProduct = async (
    id: string,
    desc: string,
    rate: number,
    sender: string
  ): Promise<ApiResponseType<Post>> => {
    try {
      const response = await apiV2Client.post(`/posts/${id}/reviews`, { desc, rate, sender });
      return {
        status: ApiStatus.SUCCESS,
        data: response.data,
      };
    } catch {
      return {
        status: ApiStatus.ERROR,
        errorMessage: 'Failed to review product',
      };
    }
  };
}

export const apiService = new ApiService();
