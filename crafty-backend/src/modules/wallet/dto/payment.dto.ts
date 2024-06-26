import { ApiProperty } from '@nestjs/swagger'
import { IsNumber } from 'class-validator'

export class GenerateQRDTO {
  @ApiProperty({
    example: '1000',
    description: 'The amount to generate the QR code for',
  })
  amount: string
}

export class SCBCallbackDTO {
  payeeProxyId: string
  payeeProxyType: string
  payeeAccountNumber: string
  payeeName: string
  payerProxyId: string
  payerProxyType: string
  payerAccountNumber: string
  payerName: string
  sendingBankCode: string
  receivingBankCode: string
  amount: string
  channelCode: string
  transactionId: string
  transactionDateandTime: string
  billPaymentRef1: string
  billPaymentRef3: string
  currencyCode: string
  transactionType: string
}
