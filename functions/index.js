import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()

import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_KEY})

const databaseId = process.env.NOTION_DATABASE_ID

async function retrieveDatabase(){
  try{
    const response = await notion.databases.retrieve({ database_id: databaseId });
    console.log(response)
    return response
  } catch (error){
    console.error(error.body)
  }
}

async function addItem(text) {
  try {
    const response = await notion.pages.create({
      parent: { type: "database_id",
                database_id: databaseId },
      properties: {
        title: {
          title:[
            {
              "text": {
                "content": text
              }
            }
          ]
        }
      },
    })
    console.log(response)
    console.log("Success! Entry added.")
  } catch (error) {
    console.error(error.body)
  }
}


retrieveDatabase()
addItem("Yurts in Big Sur, California")
