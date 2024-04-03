import { ApiProperty } from '@nestjs/swagger'


export class FavoriteDto {
  @ApiProperty(
    {
      description: 'The id of the post',
      type: String,
      example: 'The id of the post',
    },
  )
  userId: string
}