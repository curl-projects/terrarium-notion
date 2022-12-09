var dotenv = require('dotenv') // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
var fetch = require('node-fetch')
dotenv.config()

async function checkNotionUserlessAuth(guildName){
  try{
  const url = `${process.env.DOMAIN}discord/notion-userless-auth`
  console.log("env", `${process.env.BACKEND_USERNAME}:${process.env.BACKEND_PASSWORD}`)
  const authToken = Buffer.from(
    `${process.env.BACKEND_USERNAME}:${process.env.BACKEND_PASSWORD}`
  ).toString("base64");

  console.log("GUILDNAME", guildName)

  const data = {
    guildName: guildName,
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
    console.log("ERROR", error)
    throw new Error("NotionUserlessAuthError")
  }
}

// checkNotionAuth("Updated Guild Name", "New Users")
module.exports = checkNotionUserlessAuth
