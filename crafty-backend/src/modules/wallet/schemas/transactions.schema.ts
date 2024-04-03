import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

export type TransactionDocuments = HydratedDocument<Transaction>

export enum TransactionType {
  Topup = 'Topup',
  Buy = 'Buy',
  Sell = 'Sell',
  // Withdrawal = 'Withdrawal',
}

export type AccountId = string | 'System'

@Schema()
export class Transaction {
  @Prop()
  txid: string

  @Prop()
  sourceAccount: AccountId

  @Prop()
  destinationAccount: AccountId

  @Prop()
  type: TransactionType

  @Prop()
  amount: number

  @Prop()
  timestamp: Date
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction)
