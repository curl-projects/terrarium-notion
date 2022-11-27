const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

async function addThreadAndMessages(thread, messages){

  const messageSchema = messages.map(function(message){
                                                  return({
                                                    messageUser: message.author,
                                                    messageContent: message.clean_content
                                                  })
                                                })
  const dbThread = await prisma.thread.upsert({
    where: {
      ticketNumber: String(thread.id)
    },
    create: {
      ticketNumber: String(thread.id),
      threadName: thread.name,
      createdTime: new Date().toISOString(),
      threadLink: thread.jump_url,
      bugOverview: messages[0]['clean_content'],
      DiscordMessage: {
        createMany: {
          data: messageSchema
        }
      }
    },
    update: {

    }
  })
}



module.exports = addThreadAndMessages
