var dotenv = require('dotenv') // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()

const { Client } = require("@notionhq/client");
const checkNotionUserlessAuth = require("./auth-functions/check-notion-userless-auth")
const checkForDatabase = require("./notion-functions/check-for-database")
const searchForAnchor = require("./notion-functions/find-anchor")
const queryDBForPage = require("./notion-functions/query-db-for-page")
const updatePageBlock = require("./notion-functions/update-page-block")

async function updatePage(threadId, author, content, guild){
  const notionAuth = await checkNotionUserlessAuth(guild)

  console.log("NOTION AUTH", notionAuth)
  const notion = new Client({ auth: String(notionAuth)})

  const anchorId = await searchForAnchor(notion)
  const databaseId = await checkForDatabase(anchorId, notion)

  // FETCH PAGE ID FROM TITLE
  const pageId = await queryDBForPage(threadId, databaseId, notion)
  console.log("OUTER PAGE ID", pageId['results'][0]['id'])

  const pageBlock = await updatePageBlock(pageId['results'][0]['id'], author, content, notion)

  // FIND PAGE ID
  // UPDATE PAGE

  console.log("PAGE BLOCK", pageBlock)
}

module.exports = updatePage
