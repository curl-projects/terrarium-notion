async function updatePageBlock(pageId, author, content, notion){
  const response = await notion.blocks.children.append({
    block_id: pageId,
    children: [
      {
        "paragraph": {
          "rich_text": [
            {
              "text": {
                "content": `[${author}] `
              },
              "annotations": {
                'bold': true
              }
            },
            {
              "type": "text",
              "text": {
                "content": content
              }
            }
          ]
        }
      }
    ]
  })

  return response
}

module.exports = updatePageBlock
