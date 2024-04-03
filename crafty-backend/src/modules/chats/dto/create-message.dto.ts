import { ApiProperty } from '@nestjs/swagger'
import { MessageType } from '@prisma/client'

export class CreateMessageDto {
  @ApiProperty({
    example: 'chat_user1_id',
    description: 'The unique identifier of the message sender (User).',
  })
  senderId: string

  @ApiProperty({
    example: 'Hello, World!',
    description: 'The content of the message.',
  })
  content: string

  @ApiProperty({
    example: 'TEXT',
    description: 'The type of the message.',
    enum: MessageType,
  })
  messageType: MessageType

  @ApiProperty({
    example: 'chatroom001',
    description:
      'The unique identifier of the chat room associated with the message.',
  })
  chatroomId: string
}
