import { ApiProperty } from '@nestjs/swagger'
import { IsNumber } from 'class-validator'
import { TransactionType } from '../schemas/transactions.schema'

export class DepositDTO {
  @IsNumber()
  @ApiProperty({ example: 1000, description: 'The amount to deposit' })
  amount: string
}

// export class WithdrawDTO {
//   @IsNumber()
//   @ApiProperty({ example: 1000, description: 'The amount to withdraw' })
//   amount: string
// }

export class TransferDTO {
  @IsNumber()
  @ApiProperty({ example: 1000, description: 'The amount to transfer' })
  amount: string

  @ApiProperty({
    example: 'account_id',
    description: 'The username of the recipient',
  })
  sourceAccount: string

  @ApiProperty({
    example: 'account_id',
    description: 'The username of the recipient',
  })
  destinationAccount: string

  @ApiProperty({
    example: 'Transfer',
    description: 'The username of the recipient',
  })
  type: TransactionType

  @ApiProperty({
    example: 'Date',
    description: 'The username of the recipient',
  })
  timestamp: Date
}
