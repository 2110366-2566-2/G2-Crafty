import { ApiProperty } from '@nestjs/swagger'
import { Review } from '@prisma/client'

export class CreateReviewDto implements Partial<Review> {
  @ApiProperty({
    description: 'The text of the review',
    type: String,
    example: 'The text of the review',
  })
  desc: string

  @ApiProperty({
    description: 'The rate of the review',
    type: Number,
    example: 5,
  })
  rate: number

  @ApiProperty({
    description: 'The sender of the review',
    type: String,
    example: 'The sender of the review',
  })
  sender: string
}
