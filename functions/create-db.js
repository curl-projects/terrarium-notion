var axios = require("axios");
var dotenv = require('dotenv') // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()

const { Client } = require("@notionhq/client");

const notion = new Client({ auth: "secret_oJzila85mbVRsWO2qBAzC3WmQdclR2PyYmvwzDVNyVE"})

const databaseId = process.env.NOTION_DATABASE_ID

async function searchPages(query){
  const response = await notion.search({
    query: query,
    sort: {
      direction: 'ascending',
      timestamp: "last_edited_time"
    },
    filter: {
      property: "object",
      value: 'page'
    }
  });
  return response
}

async function createDatabaseInPage(pageName){

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
    }
  }

  try{
    const response = await searchPages(pageName)

    const pageId = response['results'][0]['id']
    console.log("PAGE ID:", pageId)

    const options = {
      method: "POST",
      url: "https://api.notion.com/v1/databases",
      headers: {
        accept: "application/json",

        'Authorization': `Bearer secret_oJzila85mbVRsWO2qBAzC3WmQdclR2PyYmvwzDVNyVE`,
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

    axios.request(options)
      .then(function(response){
        console.log(response.data)
      })
  } catch(error){
    console.error(error.body)
  }
}

createDatabaseInPage('Notion API Tests')
