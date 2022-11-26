import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
const dayjs = require('dayjs');

async function addThreadAndMessages(thread, messages){

  const messageSchema = messages.map(message => {
                                                  messageUser: message.author,
                                                  messageContent: message.clean_content,
                                                })
  const thread = await prisma.thread.create({
    data: {
      ticketNumber: thread.id,
      threadName: thread.name,
      createdTime: dayjs(),
      threadLink: thread.jump_url,
      bugOverview: messages[0]['clean_content'],
      threadMessages: {
        create: messageSchema
      }
    }
  })
}



module.exports = addThreadAndMessages
