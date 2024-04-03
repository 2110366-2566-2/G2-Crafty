import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Patch,
  All,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common'
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger'
import { AuthGuard } from '../auth/guard/auth.guard'
import { PaymentService } from './payment.service'
import { GetUser } from '../users/get-user.decorator'
import { User } from '@prisma/client'
import { WalletService } from './wallet.service'
import { SCBCallbackDTO } from './dto/payment.dto'
import { TransferDTO } from './dto/wallet.dto'

@ApiTags('wallet')
@Controller('wallet')
// @Roles('ADMIN')
@ApiBearerAuth()
export class WalletsController {
  constructor(
    private readonly paymentService: PaymentService,
    private readonly walletService: WalletService,
  ) {}

  @UseGuards(AuthGuard)
  @Get('/payment/qr')
  @ApiOkResponse({ type: String })
  async GetQRCode(@GetUser() user: User, @Query('amount') amount: number) {
    const { qrImage, ref1, ref3, tid } = await this.paymentService.generateQR(
      amount,
    )
    const uid = user.id
    // const uid = 'testid'
    this.walletService.createPendingTopup(uid, amount, ref1, ref3, tid)

    return qrImage
  }

  @UseGuards(AuthGuard)
  @Get('/balance')
  @ApiOkResponse({ type: Number })
  async GetBalance(@GetUser() user: User) {
    const uid = user.id
    return this.walletService.getBalance(uid)
  }

  @UseGuards(AuthGuard)
  @Get('/transactions')
  @ApiOkResponse({ type: Array<TransferDTO> })
  async GetTransactions(@GetUser() user: User) {
    const uid = user.id
    return this.walletService.getTransactions(uid)
  }

  @Post('/payment/scb/cb')
  @ApiOkResponse({ type: String })
  async SCBCallback(@Body() body: SCBCallbackDTO) {
    console.log(body)
    const ref1 = body.billPaymentRef1
    const ref3 = body.billPaymentRef3
    const amount = body.amount
    return this.walletService.confirmTopup(ref1, ref3, parseFloat(amount))
    // return 'OK'
  }
}
