var axios = require("axios");
var dotenv = require('dotenv') // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()

async function createRoadmap(pageId, notionAuth){
  const roadmapProperties = {
    "Feature Description": {
      "id": "fy:{",
      "type": "title",
      'name': "Feature Description",
      "title": {}
    },
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
              "content": "Feature Roadmap",
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
            "plain_text": "Feature Roadmap",
            "href": null
          }],
    }
  }

  const id = await axios.request(options)
    .then(async function(response){
      const id = await response.data.id
      if(!id){
        throw new Error("AxiosRequestError")
      }
      else{
        return id
      }
    })
  return id
}

module.exports = createRoadmap
