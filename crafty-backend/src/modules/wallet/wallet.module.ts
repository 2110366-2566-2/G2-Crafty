import { Module } from '@nestjs/common'
import { WalletsController } from './wallet.controller'
import { PaymentService } from './payment.service'
import { WalletService } from './wallet.service'
import { MongooseModule } from '@nestjs/mongoose'
import { Topup, TopupSchema } from './schemas/topup.schema'
import { Transaction, TransactionSchema } from './schemas/transactions.schema'
import { Wallet, WalletSchema } from './schemas/wallet.schma'

@Module({
  controllers: [WalletsController],
  providers: [PaymentService, WalletService],
  imports: [
    MongooseModule.forFeature([
      { name: Topup.name, schema: TopupSchema },
      { name: Transaction.name, schema: TransactionSchema },
      { name: Wallet.name, schema: WalletSchema },
    ]),
  ],
  exports: [WalletService],
})
export class WalletModule {}
