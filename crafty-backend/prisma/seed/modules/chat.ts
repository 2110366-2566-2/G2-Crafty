import { MessageType, PrismaClient } from '@prisma/client'

export const chatSeed = async () => {
  const prisma = new PrismaClient()

  const createChatroomAndMockUsers = async () => {
    // create 2 mock users
    await prisma.user.create({
      data: {
        id: 'chat_user1_id',
        username: 'chat_user1',
        hashedPwd:
          '$2b$10$R.KRjTCXGbRTj2/fFj3u3.U/3MDwOKD1EYfHVMiNs2o3eK/xM87Wu',
        role: 'USER',
      },
    })
    await prisma.user.create({
      data: {
        id: 'chat_user2_id',
        username: 'chat_user2',
        hashedPwd:
          '$2b$10$R.KRjTCXGbRTj2/fFj3u3.U/3MDwOKD1EYfHVMiNs2o3eK/xM87Wu',
        role: 'USER',
      },
    })

    // create a chatroom
    await prisma.chatroom.create({
      data: {
        id: 'chatroom001',
        crafterId: 'chat_user1_id',
        crafteeId: 'chat_user2_id',
      },
    })
  }

  await createChatroomAndMockUsers()
  await prisma.message.create({
    data: {
      chatroomId: 'chatroom001',
      senderId: 'chat_user1_id',
      content: 'Hello, user2!. I am user1',
      messageType: MessageType.TEXT,
    },
  })
  // get all postId from database and save in 'postIds'
  let postIds = []
  await prisma.post.findMany().then((posts) => {
    postIds = posts.map((post) => post.id)
  })

  for (let i = 0; i < 5; i++) {
    await prisma.chatroom.create({
      data: {
        id: `chatroom00${i + 2}`,
        crafterId: 'ValOHuWT2JZ6lvXN8pV4Fs9QQPG2',
        crafteeId: 'chat_user1_id',
        postId: postIds[i % postIds.length], // Alternate postId
      },
    })
  }
}
