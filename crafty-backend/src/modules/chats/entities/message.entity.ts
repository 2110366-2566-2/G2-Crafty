import { ApiProperty } from '@nestjs/swagger'
import { Message, MessageType } from '@prisma/client'

export class MessageEntity implements Partial<Message> {
  @ApiProperty({
    example: '1',
    description: 'The unique identifier of the message.',
  })
  id: string

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
    description: 'The type of the message. (TEXT, IMAGE, COMPONENT)',
    enum: MessageType,
  })
  messageType: MessageType

  @ApiProperty({
    example: false,
    description: 'Boolean that represents whether the message has been read.',
  })
  isRead: boolean

  @ApiProperty({
    example: '2023-03-12T07:20:50.52Z',
    description: 'The date and time when the message was sent.',
    type: 'string',
    format: 'date-time',
  })
  date: Date

  @ApiProperty({
    example: '1',
    description:
      'The unique identifier of the chat room associated with the message.',
  })
  chatroomId: string

  constructor(partial: Partial<MessageEntity>) {
    const allowedKeys = [
      'id',
      'senderId',
      'content',
      'messageType',
      'isRead',
      'date',
      'chatroomId',
    ]
    const messageEntity = Object.keys(partial)
      .filter((key) => allowedKeys.includes(key))
      .reduce((obj, key) => {
        obj[key] = partial[key]
        return obj
      }, {})
    Object.assign(this, messageEntity)
  }
}
