var dotenv = require('dotenv') // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()

const { Client } = require("@notionhq/client");

const createRoadmap = require("./client-functions/create-roadmap")
const searchForAnchor = require("./notion-functions/find-anchor")
const checkForDatabase = require("./notion-functions/check-for-database")

async function addRoadmap(notionAuth, featureName){
  try{
    const notion = new Client({ auth: notionAuth});

    const anchorId = await searchForAnchor(notion) // throws a handled error if the anchor doesn't exist

    let databaseId = await checkForDatabase(anchorId, notion, "Feature Roadmap") // throws a handled error if there are multiple databases

    // IF IT DOESN'T EXIST, CREATE IT AT THE TOP LEVEL IN THE ANCHOR PAGE
    console.log("DATABASE ID", databaseId)
    if(databaseId === undefined){
      executionTracker.createDatabase = true
      databaseId = await createRoadmap(anchorId, notionAuth)
      console.log("AFTER DATABASE ID INNER:", databaseId)
    }

    // add feature to the roadmap
    const response = await notion.pages.create({
      parent: { type: "database_id",
                database_id: databaseId },
      properties: {
        title: {
          title:[
            {
              "text": {
                "content": featureName
              }
            }
          ]
        },
      },
      children: []
    })
  } catch (error){
    throw new Error('CreateRoadmapError', {cause: error})
  }
}
