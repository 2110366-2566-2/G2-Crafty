import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Transaction, TransactionType } from './schemas/transactions.schema'
import { Model, Document, Types } from 'mongoose'
import { Topup, TopupStatus } from './schemas/topup.schema'
import { uuidv7 as uuid } from 'uuidv7'
import { Wallet } from './schemas/wallet.schma'

@Injectable()
export class WalletService {
  constructor(
    @InjectModel(Transaction.name)
    private readonly transactionModel: Model<Transaction>,
    @InjectModel(Topup.name)
    private readonly topupModel: Model<Topup>,
    @InjectModel(Wallet.name)
    private readonly walletModel: Model<Wallet>,
  ) {}

  private async getWallet(uid: string): Promise<
    Document<unknown, object, Wallet> &
      Wallet & {
        _id: Types.ObjectId
      }
  > {
    let wallet = await this.walletModel.findOne({ accountId: uid }).exec()
    if (!wallet) {
      wallet = new this.walletModel({ accountId: uid, amount: 0 })
      await wallet.save()
    }
    return wallet
  }

  private async addMoneyToWallet(uid: string, amount: number): Promise<Wallet> {
    const wallet = await this.getWallet(uid)
    wallet.amount += amount
    return wallet.save()
  }

  async getBalance(uid: string): Promise<number> {
    const wallet = await this.getWallet(uid)
    return wallet.amount
  }

  private async createTransaction(
    transaction: Transaction,
  ): Promise<Transaction> {
    const createdTransaction = new this.transactionModel(transaction)
    return createdTransaction.save()
  }

  private async createTopup(topup: Topup): Promise<Topup> {
    const createdTopup = new this.topupModel(topup)
    return createdTopup.save()
  }

  async getTransactions(uid: string): Promise<Transaction[]> {
    return this.transactionModel
      .find({ $or: [{ sourceAccount: uid }, { destinationAccount: uid }] })
      .exec()
  }

  async getTopup(txid: string): Promise<Topup> {
    return this.topupModel.findOne({ txid }).exec()
  }

  async getTopups(uid: string): Promise<Topup[]> {
    return this.topupModel.find({ account: uid }).exec()
  }

  async transfer(
    uid: string,
    amount: number,
    recipient: string,
  ): Promise<Transaction> {
    const txid = uuid()
    if (amount <= 0) throw new Error('Invalid amount')
    const transaction = {
      txid,
      sourceAccount: uid,
      amount,
      type: TransactionType.Transfer,
      destinationAccount: recipient,
      timestamp: new Date(),
    }
    return this.createTransaction(transaction)
  }

  async createPendingTopup(
    uid: string,
    amount: number,
    ref1: string,
    ref3: string,
    trackingId: string,
  ): Promise<Topup> {
    const txid = uuid()
    const topup = {
      txid,
      account: uid,
      amount,
      ref1,
      ref3,
      trackingId,
      status: TopupStatus.Pending,
      timestamp: new Date(),
    }
    return this.createTopup(topup)
  }

  async confirmTopup(
    ref1: string,
    ref3: string,
    amount: number,
    // ): Promise<{ Topup: Topup; Transaction: Transaction }> {
  ) {
    const topup = await this.topupModel.findOne({ ref1, ref3 }).exec()
    if (!topup) throw new Error('Topup not found')
    // if (topup.amount !== amount) throw new Error('Amount mismatch')
    topup.status = TopupStatus.Completed
    topup.amount = amount
    const ptop = await topup.save()
    const tx = {
      txid: topup.txid,
      sourceAccount: 'System',
      destinationAccount: topup.account,
      amount: topup.amount,
      type: TransactionType.Topup,
      timestamp: new Date(),
    }
    this.createTransaction(tx)
    this.addMoneyToWallet(topup.account, topup.amount)

    // return Promise.all([ptop, this.createTransaction(tx)])
  }
}
