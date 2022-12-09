var dotenv = require('dotenv') // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
var fetch = require('node-fetch')
dotenv.config()

async function checkNotionAuth(guildName, discordUserName){
  try{
  const url = `${process.env.DOMAIN}discord/notion-auth`
  console.log("env", `${process.env.BACKEND_USERNAME}:${process.env.BACKEND_PASSWORD}`)
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

  const resJson = await response.json()

  console.log("RESPONSE", resJson)
  return resJson['notionAuth']
  }
  catch (error){
    throw new Error("NotionAuthError")
  }

}

// checkNotionAuth("Updated Guild Name", "New Users")
module.exports = checkNotionAuth
