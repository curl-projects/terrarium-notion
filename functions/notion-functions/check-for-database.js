var dotenv = require('dotenv') // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()

const { Client } = require("@notionhq/client");

async function checkForDatabase(anchorId, notion){
  const response = await notion.blocks.children.list({
    block_id: anchorId
  })
  if(response.results){
    const child_databases = response.results.filter(el =>(el.type === 'child_database' && el.child_database.title === "Support Tickets"))
    if(child_databases.length > 1){
      console.error("Error -- multiple databases called 'Support Tickets' identified")
      throw new Error("MultipleDB")

    }
    else if(child_databases.length === 0){
      console.log("No 'Support Ticket' database identified")
      return undefined
    }
    else{
      console.log("Support Ticket database identifed:", child_databases[0]["id"])
      return child_databases[0]['id']
    }
  }
  else{
    return undefined
  }
}

// checkForDatabase("6d5908c6-cf0a-4ab1-92bc-3f94861b20fe")

module.exports = checkForDatabase
