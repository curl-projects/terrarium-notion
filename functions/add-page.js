var dotenv = require('dotenv') // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()

const { Client } = require("@notionhq/client");

const checkNotionAuth = require("./auth-functions/check-notion-auth")
const searchForAnchor = require("./notion-functions/find-anchor")
const checkForDatabase = require("./notion-functions/check-for-database")
const createDatabase = require("./notion-functions/create-database")
const addThreadAndMessages = require("./prisma-functions/add-thread-and-messages")
async function addPage(thread, messages, guild, user){
  // Check if authorized and return Notion key

  try {
    // FIRST FIND THE USER WORKSPACE WE'RE WORKING WITH
    const notionAuth = await checkNotionAuth(guild, user)

    console.log("NOTION AUTH", notionAuth)

    const notion = new Client({ auth: notionAuth})

    var executionTracker = {
      createDatabase: false,
    }

    // THEN CHECK IF THE ANCHOR EXISTS (A PAGE CALLED "TERRARIUM")
    const anchorId = await searchForAnchor(notion) // throws a handled error if the anchor doesn't exist

    console.log("ANCHOR:", anchorId)

    // THEN CHECK IF THE DATABASE EXISTS (A DB CALLED 'SUPPORT TICKETS' THAT'S IN THE ANCHOR PAGE)
    let databaseId = await checkForDatabase(anchorId, notion) // throws a handled error if there are multiple databases

      // IF IT DOESN'T EXIST, CREATE IT AT THE TOP LEVEL IN THE ANCHOR PAGE
      console.log("DATABASE ID", databaseId)
      if(databaseId === undefined){
        executionTracker.createDatabase = true
        databaseId = await createDatabase(anchorId, notionAuth)
        console.log("AFTER DATABASE ID INNER:", databaseId)
      }

    console.log("AFTER DATABASE ID:", databaseId)
    // ADD SUPPORT TICKET PAGE TO THE DATABASE
    const response = await notion.pages.create({
      parent: { type: "database_id",
                database_id: databaseId },
      properties: {
        title: {
          title:[
            {
              "text": {
                "content": String(thread.id)
              }
            }
          ]
        },
        "Bug Overview": {
          'rich_text': [
            {
            type: "text",
            "text": {
              content: messages[0]['clean_content']
              }
            }
          ]
        },
        "Discord Users": {
          "multi_select": createUniqueAuthors(messages)
        },
        "Status": {
          'select': {
            'name': "Not Started"
          }
        },
        // "Tagged Engineer": {
        //   "people": [
        //     {
        //       "object": "user",
        //       "id": "6724b297-5a0b-4f89-adc7-006da651ea11"
        //     }
        //   ]
        // },

        "Thread Title": {
          'rich_text': [
            {
            type: "text",
            "text": {
              content: thread.name
              }
            }
          ]
        },

        "Thread Link": {
          "url": thread.jump_url
        }
      },
      children: createChildren(messages)
    })

    const dbThread = await addThreadAndMessages(thread, messages)
    return executionTracker
  } catch (error) {
    console.log("ERROR BODY:", error.message)
    throw new Error('AddPageError', {cause: error})
  }
}


// UTILITY FUNCTIONS FOR DATA MANIPULATION
function createChildren(children){
  var arr = []
  for(let child of children){
    let childObj = {
      "object": "block",
      "type": "paragraph",
      "paragraph": {
        "rich_text": [
          {
            "text": {
              "content": `[${child.author}] `
            },
            "annotations": {
              'bold': true
            }
          },
          {
            "type": "text",
            "text": {
              "content": child.clean_content
            }
          }
        ]
      }
    }
    arr.push(childObj)
  }
  return arr
}

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

function createUniqueAuthors(messages){
  const arr = []
  const authors = messages.map(a => a.author)
  const uniqueAuthors = authors.filter(onlyUnique)
  for(let author of uniqueAuthors){
    arr.push({ "name": author})
  }
  return arr
}


module.exports = addPage
