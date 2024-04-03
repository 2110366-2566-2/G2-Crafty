import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'
import { AccountId } from './transactions.schema'

export type WalletDocuments = HydratedDocument<Wallet>

@Schema()
export class Wallet {
  @Prop()
  accountId: AccountId

  @Prop()
  amount: number
}

export const WalletSchema = SchemaFactory.createForClass(Wallet)
