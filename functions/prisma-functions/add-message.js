import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function addMessage(threadId, author, content){
  const message = await prisma.threadMessage.create({
    data: {
      messageUser: author,
      messageContent: content,
      thread: {
        connect: { ticketNumber: threadId }
      }
    }
  })

  return message
}

module.exports = addMessage
