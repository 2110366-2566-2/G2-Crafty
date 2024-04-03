import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateProductDto } from './dto/create-product.dto'
import { UpdateProductDto } from './dto/update-product.dto'
import { PrismaService } from 'src/prisma/prisma.service'
import { PayProductDto } from './dto/pay-product.dto'
import { WalletService } from '../wallet/wallet.service'

@Injectable()
export class ProductsService {
  constructor(
    private prisma: PrismaService,
    private walletService: WalletService,
  ) {}

  async create(createProductDto: CreateProductDto) {
    return await this.prisma.product.create({
      data: createProductDto,
    })
  }

  async findAll() {
    return await this.prisma.product.findMany()
  }

  async findOne(id: string) {
    const product = await this.prisma.product.findUnique({
      where: { id },
    })

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`)
    }
    return product
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    try {
      const product = await this.findOne(id)
      let updateData = {}

      // Check if incrementStep is true and the current step is less than 6
      if (updateProductDto.incrementStep && product.step < 6) {
        updateData['step'] = { increment: 1 }
      }

      // Check if isPaid is provided in updateProductDto and update it
      if (updateProductDto.isPaid !== undefined) {
        updateData['isPaid'] = updateProductDto.isPaid
      }

      // If there's something to update, proceed with the update
      if (Object.keys(updateData).length > 0) {
        await this.prisma.product.update({
          where: { id },
          data: updateData,
        })
      }

      return this.findOne(id)
    } catch (error) {
      console.log(error)
      throw new NotFoundException(`Product with ID ${id} not found`)
    }
  }

  async remove(id: string) {
    return await this.prisma.product.delete({
      where: { id },
    })
  }

  async pay(payProductDto: PayProductDto) {
    const { productId, from, to, amount } = payProductDto
    try {
      // sending money
      const transaction = await this.walletService.transfer(from, amount, to)

      // update isPaid to true after success
      await this.update(productId, { isPaid: true })

      return { success: true, message: 'Payment processed successfully.' }
    } catch (err) {
      console.error('Payment processing failed:', err)
      throw new Error('Payment processing failed. Please try again later.')
    }
  }
}
