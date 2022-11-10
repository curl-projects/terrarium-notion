var dotenv = require('dotenv') // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()

const { Client } = require("@notionhq/client");

const notion = new Client({ auth: process.env.NOTION_KEY})


// FIND PAGE USING DISCORD THREAD ID
async function queryDatabase(){
  const response = await notion.databases.query({
    database_id: "d34c779a745f439aaa25b8792948dc82",
  })
  return response
}

// UPDATE PAGE WITH NEW BLOCK
async function updatePage(){
  const dbPages = await queryDatabase();
  const response = await notion.blocks.children.append({
    block_id: dbPages['results'][0]["id"],
    children: [
      {
        "paragraph": {
          "rich_text": [
            {
              "text": {
                "content": "[Finn]"
              },
              "annotations": {
                'bold': true
              }
            },
            {
              "text": {
                "content": "This is an updated page fragment!"
              }
            }
          ]
        }
      }
    ]
  })
  return response
}


const updatedPage = await updatePage()
console.log(updatedPage)
