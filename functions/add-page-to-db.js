import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()

import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_KEY})

async function addPage(text){
  try {
    const response = await notion.pages.create({
      parent: { type: "database_id",
                database_id: "d34c779a745f439aaa25b8792948dc82" },
      properties: {
        title: {
          title:[
            {
              "text": {
                "content": text
              }
            }
          ]
        },
        "Bug Overview": {
          'rich_text': [
            {
            type: "text",
            "text": {
              content: "This is a placeholder description"
              }
            }
          ]
        },
        "Discord User": {
          "select": {
            'name': "@finn123"
          }
        },
        "Status": {
          'select': {
            'name': "Not Started"
          }
        },
        "Tagged Engineer": {
          "people": [
            {
              "object": "user",
              "id": "6724b297-5a0b-4f89-adc7-006da651ea11"
            }
          ]
        },

        "Thread Link": {
          "url": "https://en.wikipedia.org/wiki/Terrarium"
        }
      },
      children: [
        {
          "object": "block",
          "type": "paragraph",
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
                "type": "text",
                "text": {
                  "content": "This is the first message from the discord!"
                }
              }
            ]
          }
        },
        {
          "object": "block",
          "type": "paragraph",
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
                "type": "text",
                "text": {
                  "content": "This is the second message from the discord!"
                }
              }
            ]
          }
        },
      ]
    })
    console.log(response)
    console.log("Success! Entry added.")
  } catch (error) {
    console.error(error.body)
  }
}

addPage("Bug with Whiteboard Loading Quickly")
