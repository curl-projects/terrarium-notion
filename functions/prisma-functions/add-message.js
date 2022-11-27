const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

async function addMessage(threadId, author, content){
  const message = await prisma.discordMessage.create({
    data: {
      messageUser: author,
      messageContent: content,
      Thread: {
        connect: { ticketNumber: String(threadId) }
      }
    }
  })

  return message
}

module.exports = addMessage
