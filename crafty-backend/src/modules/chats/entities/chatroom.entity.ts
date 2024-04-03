import { ApiProperty } from '@nestjs/swagger'
import { Chatroom } from '@prisma/client'

export class ChatroomEntity implements Partial<Chatroom> {
  @ApiProperty({
    example: '1',
    description: 'The unique identifier of the chat room.',
  })
  id: string

  @ApiProperty({
    example: 'chat_user1_id',
    description: 'Crafter id in the chat room.',
  })
  crafterId: string

  @ApiProperty({
    example: 'chat_user2_id',
    description: 'Craftee in the chat room.',
  })
  crafteeId: string

  constructor(partial: Partial<ChatroomEntity>) {
    const allowedKeys = ['id', 'crafterId', 'crafteeId']
    const chatRoomEntity = Object.keys(partial)
      .filter((key) => allowedKeys.includes(key))
      .reduce((obj, key) => {
        obj[key] = partial[key]
        return obj
      }, {})
    Object.assign(this, chatRoomEntity)
  }
}
