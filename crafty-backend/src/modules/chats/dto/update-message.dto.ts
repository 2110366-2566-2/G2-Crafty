import { ApiProperty } from '@nestjs/swagger'

export class UpdateMessageDto {
  @ApiProperty({
    example: true,
    description: 'The read status of the message.',
  })
  isRead: boolean
}
