import { Injectable } from '@nestjs/common'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'
import { Topup } from './schemas/topup.schema'

interface QRResponse {
  qrImage: string

  ref1: string
  ref3: string
  tid: string
}

@Injectable()
export class PaymentService {
  constructor() {
    // this.
  }
  private generateRandomString(length: number): string {
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    let result = ''
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length)
      result += charset[randomIndex]
    }
    return result
  }

  private generateRandomNumber(length: number): string {
    const charset = '0123456789'
    let result = ''
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length)
      result += charset[randomIndex]
    }
    return result
  }

  private async generateOAuthToken(): Promise<string> {
    const apiKey = process.env.SCB_API_KEY
    const apiSecret = process.env.SCB_API_SECRET
    const reqUUID = uuidv4()
    const header = {
      'Content-Type': 'application/json',
      resourceOwnerId: apiKey,
      requestUid: reqUUID,
      'accept-language': 'EN',
    }
    const data = {
      applicationKey: apiKey,
      applicationSecret: apiSecret,
    }

    const res = await axios.post(
      'https://api-sandbox.partners.scb/partners/sandbox/v1/oauth/token',
      data,
      { headers: header },
    )
    const status = res.data.status.code
    // consol
    if (status !== 1000) {
      throw new Error('Failed to generate OAuth token')
    }
    // console.log(res.data.data)
    const accessToken = res.data.data.accessToken

    return accessToken
  }

  async generateQR(amount: number): Promise<QRResponse> {
    const accessToken = await this.generateOAuthToken()
    const reqUUID = uuidv4()
    // const apiKey = process.env.SCB_API_KEY
    const ref1 = this.generateRandomString(20)
    const ref3 = 'CRT' + this.generateRandomNumber(8)
    const header = {
      'content-type': 'application/json',
      resourceOwnerId: process.env.SCB_API_KEY,
      requestUid: reqUUID,
      'accept-language': 'EN',
      authorization: `Bearer ${accessToken}`,
    }
    const data = {
      qrType: 'PPCS',
      amount: amount,
      invoice: ref1,
      merchantId: process.env.SCB_MERCHANT_ID,
      terminalId: process.env.SCB_TERMINAL_ID,
      ppType: 'BILLERID',
      ppId: process.env.SCB_BILLER_ID,
      ref1: ref1,
      ref3: ref3,
    }
    console.log(data)
    console.log(header)
    const res = await axios
      .post(
        'https://api-sandbox.partners.scb/partners/sandbox/v1/payment/qrcode/create',
        data,
        { headers: header },
      )
      .catch((err) => {
        console.log(err.code)
        return err.response
      })
    console.log(res.data.status)
    if (res.data.status.code !== 1000) {
      throw new Error('Failed to generate QR code')
    }
    return {
      qrImage: res.data.data.qrImage,
      ref1,
      ref3,
      tid: reqUUID,
    }
  }

  async checkPaymentStatus(topup: Topup): Promise<boolean> {
    const accessToken = await this.generateOAuthToken()
    const header = {
      'content-type': 'application/json',
      resourceOwnerId: process.env.SCB_API_KEY,
      requestUid: uuidv4(),
      'accept-language': 'EN',
      authorization: `Bearer ${accessToken}`,
    }
    const data = {
      eventCode: '00300100',
      transactionDate: topup.timestamp.toLocaleDateString('en-GB', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }),
      billerId: process.env.SCB_BILLER_ID,
      reference1: topup.ref1,
      // reference3: topup.ref3,
      // parent
    }
    console.log(header)
    console.log(data)
    const res = await axios.post(
      'https://api-sandbox.partners.scb/partners/sandbox/v1/payment/qrcode/validate',
      data,
      { headers: header },
    )
    console.log(res.data)
    if (res.data.status.code !== 1000) {
      throw new Error('Failed to validate payment')
    }
    return res.data.data.status === 'PAID'
  }
}
