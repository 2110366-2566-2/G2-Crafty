import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsUUID } from 'class-validator'

export class CreateChatroomDto {
  @ApiProperty({
    example: 'chat_user1_id',
    description: 'id of crafter in this chatroom.',
  })
  @IsNotEmpty()
  crafterId: string

  @ApiProperty({
    example: 'chat_user2_id',
    description: 'id of craftee in this chatroom.',
  })
  @IsNotEmpty()
  crafteeId: string

  @ApiProperty({
    example: 'product001',
    description: 'id of product from this chatroom.',
  })
  postId?: string
}
