import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'
import { CreateMessageDto } from './dto/create-message.dto'
import { CreateChatroomDto } from './dto/create-chatroom.dto'
import { MessageEntity } from './entities/message.entity'
import { ChatroomEntity } from './entities/chatroom.entity'
import { User } from '@prisma/client'

@Injectable()
export class ChatsService {
  constructor(private prisma: PrismaService) {}

  async findAllChatroomsForUser(user: User) {
    if (user.role === 'ADMIN') {
      return await this.prisma.chatroom.findMany({
        select: {
          id: true,
          lastChatTime: true,
          isCrafterRead: true,
          isCrafteeRead: true,
          craftee: {
            select: {
              username: true,
              id: true,
              role: true,
            },
          },
          crafter: {
            select: {
              username: true,
              id: true,
              role: true,
            },
          },
          postId: true,
        },
      })
    }
    return await this.prisma.chatroom.findMany({
      where: {
        OR: [
          {
            crafterId: user.id,
          },
          {
            crafteeId: user.id,
          },
        ],
      },
      select: {
        id: true,
        lastChatTime: true,
        isCrafterRead: true,
        isCrafteeRead: true,
        craftee: {
          select: {
            username: true,
            id: true,
            role: true,
          },
        },
        crafter: {
          select: {
            username: true,
            id: true,
            role: true,
          },
        },
        postId: true,
      },
    })
  }

  async findAllMessagesByChatroomId(chatroomId: string, user: User) {
    // check if "user" is inside this chatroom
    const chatroom = await this.prisma.chatroom.findUnique({
      where: {
        id: chatroomId,
      },
      select: {
        crafterId: true,
        crafteeId: true,
        Product: true,
        messages: true,
        isCrafteeRead: true,
        isCrafterRead: true,
        lastChatTime: true,
        craftee: {
          select: {
            username: true,
          },
        },
        crafter: {
          select: {
            username: true,
          },
        },
        postId: true,
      },
    })
    // check if chatroom exists
    if (!chatroom) {
      throw new NotFoundException('Chatroom not found')
    }

    // if user is crafter, mark crafter's messages as read
    if (chatroom.crafterId === user.id) {
      await this.prisma.chatroom.update({
        where: {
          id: chatroomId,
        },
        data: {
          isCrafterRead: true,
        },
      })
    }
    // if user is craftee, mark craftee's messages as read
    else if (chatroom.crafteeId === user.id) {
      await this.prisma.chatroom.update({
        where: {
          id: chatroomId,
        },
        data: {
          isCrafteeRead: true,
        },
      })
    } else if (user.role !== 'ADMIN') {
      // otherwise user is not part of this chatroom
      throw new UnauthorizedException('User is not part of this chatroom')
    }
    // return chatroom data
    return chatroom
  }

  async createMessage(createMessageDto: CreateMessageDto, user: User) {
    const { chatroomId, content, messageType, senderId } = createMessageDto
    // check if chatroom exists, and user is part of it
    const chatroom = await this.prisma.chatroom.findUnique({
      where: {
        id: chatroomId,
      },
      select: {
        crafterId: true,
        crafteeId: true,
      },
    })
    if (!chatroom) {
      throw new NotFoundException('Chatroom not found')
    }
    if (chatroom.crafterId !== user.id && chatroom.crafteeId !== user.id) {
      throw new UnauthorizedException('User is not part of this chatroom')
    }

    // create message
    const message = await this.prisma.message.create({
      data: {
        chatroomId,
        content,
        messageType,
        senderId,
      },
    })
    // update chatroom's lastChatTime, read status
    await this.prisma.chatroom.update({
      where: {
        id: chatroomId,
      },
      data: {
        lastChatTime: message.date,
        // Conditional update based on senderId
        ...(senderId === chatroom.crafterId
          ? { isCrafteeRead: false, isCrafterRead: true }
          : { isCrafterRead: false, isCrafteeRead: true }),
      },
    })

    return message
  }

  async createChatroom(createChatroomDto: CreateChatroomDto, user: User) {
    const { crafterId, crafteeId, postId } = createChatroomDto
    // check if chatroom already exists
    const chatroom = await this.prisma.chatroom.findFirst({
      where: {
        crafterId,
        crafteeId,
        postId,
      },
    })
    if (chatroom) {
      return chatroom
    }

    // add to database
    return await this.prisma.chatroom.create({
      data: {
        crafterId,
        crafteeId,
        postId,
      },
    })
  }

  //temp
  async testGetUser(user: string) {
    console.log('user from GetUser():', user)
  }
}
