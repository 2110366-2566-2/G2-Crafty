import { Injectable } from '@nestjs/common'
import { CreatePostDto } from './dto/create-post.dto'
import { UpdatePostDto } from './dto/update-post.dto'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  async addReview(postId: string, desc: string, rate: number, sender: string) {
    return await this.prisma.review.create({
      data: {
        desc,
        rate,
        sender,
        postId,
      },
    })
  }

  async getReviews(postId: string) {
    return await this.prisma.review.findMany({
      where: {
        postId: postId,
      },
    })
  }

  async addFavorite(userId: string, postId: string) {
    return await this.prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        userFavorite: {
          connect: {
            id: userId,
          },
        },
      },
    })
  }

  async unFavorite(userId: string, postId: string) {
    return await this.prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        userFavorite: {
          disconnect: {
            id: userId,
          },
        },
      },
    })
  }

  async create(userId: string, createPostDto: CreatePostDto) {
    return await this.prisma.post.create({
      data: {
        ...createPostDto,
        price: Number(createPostDto.price),
        owner: {
          connect: {
            id: userId,
          },
        },
      },
    })
  }

  async findAll(search?: string) {
    return await this.prisma.post.findMany({
      include: {
        reviews: true,
        userFavorite: true,
      },
      where: {
        OR: [
          {
            title: {
              contains: search,
              mode: 'insensitive',
            },
          },
          {
            detail: {
              contains: search,
              mode: 'insensitive',
            },
          },
          {
            content: {
              contains: search,
              mode: 'insensitive',
            },
          },
          {
            owner: {
              username: {
                contains: search,
                mode: 'insensitive',
              },
            },
          },
        ],
      },
      orderBy: [
        {
          priority: 'desc',
        },
      ],
    })
  }

  async findMyPost(userId: string) {
    return await this.prisma.post.findMany({
      where: {
        ownerId: userId,
      },
      include: {
        reviews: true,
        userFavorite: true,
      },
    })
  }

  async findOne(id: string) {
    return await this.prisma.post.findUnique({
      where: { id },
      include: {
        reviews: true,
        userFavorite: true,
      },
    })
  }

  async update(id: string, updatePostDto: UpdatePostDto) {
    return await this.prisma.post.update({
      where: { id },
      data: { ...updatePostDto, price: Number(updatePostDto.price) },
    })
  }

  async remove(id: string) {
    return await this.prisma.post.delete({
      where: { id },
    })
  }

  async boosting(id: string) {
    return await this.prisma.post.update({
      where: { id },
      data: {
        priority: { increment: 1 },
      },
    })
  }

  async unboosting(id: string) {
    return await this.prisma.post.update({
      where: { id },
      data: {
        priority: { decrement: 1 },
      },
    })
  }
}
