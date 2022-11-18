var dotenv = require('dotenv') // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()

const { Client } = require("@notionhq/client");



async function searchForAnchor(notion){

  const response = await notion.search({
    query: "Terrarium",
    sort: {
      direction: 'ascending',
      timestamp: "last_edited_time"
    },
    filter: {
      property: "object",
      value: 'page'
    }
  });

  if(response.results){
    const result = response.results.find(el => el['properties']['title']['title'][0]['text']['content'] === 'Terrarium')
    if(result === undefined){
      console.error("No Anchor Found")
      throw new Error('NoAnchor')
    }
    else{
      console.log("Anchor Found:", result.id)
      return result.id
    }
  }
  else{
    throw new Error("NoAnchorResults")
  }
}

// searchForAnchor('')

module.exports = searchForAnchor
