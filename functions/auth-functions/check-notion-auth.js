var dotenv = require('dotenv') // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()

async function checkNotionAuth(guildName, discordUserName){
  const url = "http://localhost:3000/discord/notion-auth"
  const authToken = Buffer.from(
    `${process.env.BACKEND_USERNAME}:${process.env.BACKEND_PASSWORD}`
  ).toString("base64");

  const data = {
    guildName: guildName,
    discordUserName: discordUserName,
  }

  const response = await fetch(url, {
    method: 'post',
    headers: {
      "Authorization": `Basic ${authToken}`
    },
    body: JSON.stringify(data)
  })
}
