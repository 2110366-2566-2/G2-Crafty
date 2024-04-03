import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { ChatsService } from './chats.service'
import { CreateMessageDto } from './dto/create-message.dto'
import { CreateChatroomDto } from './dto/create-chatroom.dto'
import { AuthGuard } from '../auth/guard/auth.guard'
import { MessageEntity } from './entities/message.entity'
import { ChatroomEntity } from './entities/chatroom.entity'
import { GetUser } from '../users/get-user.decorator'
import { stringify } from 'querystring'
import { User } from '@prisma/client'

@ApiTags('chats')
@Controller('chats')
@UseGuards(AuthGuard)
@ApiBearerAuth()
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) {}

  @Get('test')
  async testGetUser(@GetUser() user: User) {
    return this.chatsService.testGetUser(user.id)
  }

  @Get()
  async findAllChatroomsForUser(@GetUser() user: User) {
    return this.chatsService.findAllChatroomsForUser(user)
  }

  @Get(':chatroomId')
  async findAllMessagesByChatroomId(
    @Param('chatroomId') chatroomId: string,
    @GetUser() user: User,
  ) {
    return this.chatsService.findAllMessagesByChatroomId(chatroomId, user)
  }

  @Post('message')
  async createMessage(
    @Body() createMessageDto: CreateMessageDto,
    @GetUser() user: User,
  ) {
    return this.chatsService.createMessage(createMessageDto, user)
  }

  @Post('chatroom')
  async createChatroom(
    @Body() createChatroomDto: CreateChatroomDto,
    @GetUser() user: User,
  ) {
    return this.chatsService.createChatroom(createChatroomDto, user)
  }
}
