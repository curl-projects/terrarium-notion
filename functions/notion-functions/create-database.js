var axios = require("axios");
var dotenv = require('dotenv') // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()

async function createDatabase(pageId, notionAuth){
  const dbProperties = {
    "Ticket Number": {
      "id": "fy:{",
      "type": "title",
      'name': "Ticket Number",
      "title": {}
    },
    "Bug Overview": {
      "id": "description",
      "type": "rich_text",
      "rich_text": {},
      "name": "Bug Overview"
    },
    "Logged Time": {
      "id": "logged_time",
      "type": "created_time",
      "created_time": {},
      "name": "Logged Time"
    },
    "Discord Users": {
      "id": "discord_users",
      "type": "multi_select",
      "name": "Discord User",
      "multi_select": {
        "options": []
      }
    },
    "Status": {
      "id": "status",
      "type": 'select',
      "name": "Status",
      "select": {
        "options": [
            {
              "name": "Not Started",
              "id": "not_started",
              "color": 'red'
            },
            {
              "name": "In Progress",
              "id": "in_progress",
              "color": 'orange'
            },
            {
              "name": "Completed",
              "id": "completed",
              "color": 'green'
            },
        ]
      }
    },
    "Thread Link": {
      "id": "thread_link",
      "type": "url",
      "url": {},
      "name": "Thread Link"
    },
    "Tagged Engineer": {
      "id": "tagged_eng",
      "type": "people",
      "people": {},
      'name': "Tagged Engineer"
    },
    "Thread Title": {
      "id": "thread_title",
      "type": "rich_text",
      "rich_text": {},
      "name": "Thread Title"
    }
  }

    const options = {
      method: "POST",
      url: "https://api.notion.com/v1/databases",
      headers: {
        accept: "application/json",

        'Authorization': `Bearer ${notionAuth}`,
        'Notion-Version': "2022-06-28",
        'content-type': 'application/json'
      },
      data: {
        parent: { type: 'page_id', page_id: pageId },
        properties: dbProperties,
        title: [{
              "type": "text",
              "text": {
                "content": "Support Tickets",
                "link": null
              },
              "annotations": {
                "bold": false,
                "italic": false,
                "strikethrough": false,
                "underline": false,
                "code": false,
                "color": "default"
              },
              "plain_text": "Support Tickets",
              "href": null
            }],
      }
    }

    const id = await axios.request(options)
      .then(async function(response){
        const id = await response.data.id
        console.log("HELLO! ID", id)
        console.log(response.data.id ? "YES!" : "NO!")
        if(!id){
          throw new Error("AxiosRequestError")
        }
        else{
          console.log("HI!!! ")
          return id
        }
      })
    return id
}

// createDatabase("6d5908c6-cf0a-4ab1-92bc-3f94861b20fe")
module.exports = createDatabase
