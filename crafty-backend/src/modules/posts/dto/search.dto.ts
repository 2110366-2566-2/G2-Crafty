import { ApiProperty } from '@nestjs/swagger'

export class SearchDto {
  @ApiProperty({
    description: 'The search query',
    type: String,
    example: 'search query',
    required: false,
  })
  search?: string
}
