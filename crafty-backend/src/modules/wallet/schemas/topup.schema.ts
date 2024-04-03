import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

export type TopupDocuments = HydratedDocument<Topup>

export enum TopupStatus {
  Pending = 'Pending',
  Completed = 'Completed',
  Failed = 'Failed',
}

@Schema()
export class Topup {
  @Prop()
  txid: string

  @Prop()
  account: string

  @Prop()
  amount: number

  @Prop()
  ref1: string

  @Prop()
  ref3: string

  @Prop()
  trackingId: string

  @Prop()
  status: TopupStatus

  @Prop()
  timestamp: Date
}

export const TopupSchema = SchemaFactory.createForClass(Topup)
