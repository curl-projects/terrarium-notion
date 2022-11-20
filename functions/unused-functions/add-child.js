var dotenv = require('dotenv') // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()

const { Client } = require("@notionhq/client");

// UPDATE PAGE WITH NEW BLOCK
async function addChild(){
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
