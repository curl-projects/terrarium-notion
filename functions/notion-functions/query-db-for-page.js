async function queryDBForPage(threadId, databaseId, notion){
  const response = await notion.databases.query({
    database_id: databaseId,
    filter: {
      property: "Ticket Number",
      "title": {
        "equals": String(threadId)
      }
    }
  })

  console.log("RESPONSE", response)
  return response
}

module.exports = queryDBForPage
