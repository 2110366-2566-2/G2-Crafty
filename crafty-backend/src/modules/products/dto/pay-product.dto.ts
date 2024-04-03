import { ApiProperty, PartialType } from '@nestjs/swagger'
import { CreateProductDto } from './create-product.dto'

export class PayProductDto {
  @ApiProperty({
    description: 'The ID of product',
    type: String,
  })
  productId: string

  @ApiProperty({
    description: 'Sender ID',
    type: String,
  })
  from: string

  @ApiProperty({
    description: 'Receiver ID',
    type: String,
  })
  to: string

  @ApiProperty({
    description: 'Product price',
    type: Number,
    example: true,
  })
  amount: number
}
