import { ApiProperty } from '@nestjs/swagger'
import { Product } from '@prisma/client'
import { Max, Min } from 'class-validator'

export class CreateProductDto implements Partial<Product> {
  @ApiProperty({
    description: 'The title of the product',
    type: String,
    example: 'Product Title',
  })
  title: string

  @ApiProperty({
    description: 'The description of the product',
    type: String,
    example: 'Product description - The description of the product',
  })
  desc: string

  @ApiProperty({
    description: 'The price of the product',
    type: Number,
    example: 1900,
  })
  @Min(0)
  price: number

  @ApiProperty({
    description: 'The chatRoomId of the product',
    type: String,
    example: 'chatroom001',
  })
  chatroomId: string

  @ApiProperty({
    description: 'The url of the product image',
    type: String,
    example: 'https://picsum.photos/300/200',
  })
  imageUrl?: string

  @ApiProperty({
    description: 'The deadline of the product',
    type: Date,
    // example: 'The deadline of the product',
  })
  deadline?: string

  @ApiProperty({
    description: 'The status of the product',
    type: String,
    // example: 'The status of the product',
  })
  status?: string

  @ApiProperty({
    description: 'The note of the product',
    type: String,
    // example: 'The note of the product',
  })
  note?: string
}
