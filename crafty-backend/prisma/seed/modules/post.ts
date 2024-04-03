import { PrismaClient } from '@prisma/client'

export const postSeed = async () => {
  const prisma = new PrismaClient()

  await prisma.user.create({
    data: {
      id: 'ValOHuWT2JZ6lvXN8pV4Fs9QQPG2',
      username: 'nonnolnw',
      hashedPwd: '$2b$10$R.KRjTCXGbRTj2/fFj3u3.U/3MDwOKD1EYfHVMiNs2o3eK/xM87Wu',
      role: 'USER',
    },
  })

  Array.from({ length: 20 }).forEach(async (_, i) => {
    await prisma.post.create({
      data: {
        title: `The title of the post ${i}`,
        detail: `The detail of the post ${i} ${
          ['cat', 'rat', 'bat', 'bag', 'water'][Math.floor(Math.random() * 5)]
        }`,
        content: `The content of the post ${i}`,
        price: 100 + i,
        photoUrl: `https://picsum.photos/seed/${Math.random()
          .toString(36)
          .substring(2, 15)}/1000/${
          // random Int between 8 to 30
          Math.floor(Math.random() * (18 - 8 + 1)) + 8
        }00`,
        reviews: {
          createMany: {
            data: Array.from({
              length: Math.floor(Math.random() * 18) + 3,
            }).map((_, j) => ({
              desc: `The review of the post ${i} - ${j}`,
              rate: Math.floor(Math.random() * 5) + 1,
              sender: `The sender of the post ${i} - ${j}`,
            })),
          },
        },
        owner: {
          connect: {
            id: 'ValOHuWT2JZ6lvXN8pV4Fs9QQPG2',
          },
        },
      },
    })
  })
}
