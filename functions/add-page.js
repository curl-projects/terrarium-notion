var dotenv = require('dotenv') // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()

const { Client } = require("@notionhq/client");

const notion = new Client({ auth: process.env.NOTION_KEY})

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

async function addPage(thread, messages){
  try {
    const response = await notion.pages.create({
      parent: { type: "database_id",
                database_id: "e75924ad813349bd8b123ea829c45756" },
      properties: {
        title: {
          title:[
            {
              "text": {
                "content": thread.name
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
        "Tagged Engineer": {
          "people": [
            {
              "object": "user",
              "id": "6724b297-5a0b-4f89-adc7-006da651ea11"
            }
          ]
        },

        "Thread Link": {
          "url": thread.jump_url
        }
      },
      children: createChildren(messages)
    })
    return response
    console.log("Success! Entry added.")
  } catch (error) {
    console.error(error.body)
  }
}

module.exports = addPage
