import { ApiProperty } from '@nestjs/swagger'
import { Post } from '@prisma/client'

export class PostEntity implements Post {
  @ApiProperty({
    example: '1',
    description: 'The id of the post',
  })
  id: string

  @ApiProperty({
    example: 'Title',
    description: 'The title of the post',
  })
  title: string

  @ApiProperty({
    example: 'Detail',
    description: 'The detail of the post',
  })
  detail: string

  @ApiProperty({
    example: 'Content',
    description: 'The content of the post',
  })
  content: string

  @ApiProperty({
    example: 100,
    description: 'The price of the post',
  })
  price: number

  @ApiProperty({
    example: 'https://example.com/photo.jpg',
    description: 'The photo url of the post',
  })
  photoUrl: string

  @ApiProperty({
    example: 1,
    description: 'The priority of the post',
  })
  priority: number

  @ApiProperty({
    example: '1',
    description: 'The ownerId of the post',
  })
  ownerId: string

  @ApiProperty({
    example: false,
    description: 'The isBanned of the post',
  })
  isBanned: boolean

  constructor(data: Post) {
    this.id = data.id
    this.title = data.title
    this.detail = data.detail
    this.content = data.content
    this.price = data.price
    this.photoUrl = data.photoUrl
    this.priority = data.priority
    this.ownerId = data.ownerId
    this.isBanned = data.isBanned
  }
}
