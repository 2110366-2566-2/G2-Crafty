export interface User {
  id: string;
  username: string;
  role?: string;
}

export interface ReadChatroom {
  id: string;
  lastChatTime: string;
  isCrafterRead: boolean;
  isCrafteeRead: boolean;
  crafter: User;
  craftee: User;
  postId?: string | null;
}

export interface SidebarData {
  talkerName: string;
  lastChatTime: string;
  chatroomId: string;
  isAdmin: boolean;
  isRead: boolean;
  myName: string;
  postId?: string | null;
}

export enum MessageType {
  TEXT = 'TEXT',
  IMAGE = 'IMAGE',
  COMPONENT = 'COMPONENT',
}

export interface Message {
  id: string;
  senderId: string;
  content: string;
  messageType: MessageType;
  isRead: boolean;
  date: string;
  chatroomId: string;
}

export interface PostMessage {
  chatroomId: string;
  senderId: string;
  content: string;
  messageType: MessageType | string;
}

export interface ChatroomDetail {
  id: string;
  lastChatTime: string;
  isCrafterRead: boolean;
  isCrafteeRead: boolean;
  crafter: User;
  craftee: User;
  messages: Message[];

  Product: ProductDetail | null;
  crafterId?: string;
  crafteeId?: string;
  postId: string | null;
}

export interface PostChatroom {
  crafterId: string;
  crafteeId: string;
  postId?: string | null;
}

export interface ProductDetail {
  id: string;
  title: string;
  desc: string;
  price: number;
  deadline?: string;
  status?: string;
  note?: string;
  step: number;
  imageUrl?: string;
  chatroomId: string;
  isPaid: boolean;
}

export interface PayDetail {
  productId: string;
  from: string;
  to: string;
  amount: number;
}
