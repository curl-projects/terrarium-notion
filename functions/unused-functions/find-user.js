var dotenv = require('dotenv') // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()

const { Client } = require("@notionhq/client");

const notion = new Client({ auth: "secret_oJzila85mbVRsWO2qBAzC3WmQdclR2PyYmvwzDVNyVE"})

async function retrieveUsers(){
  const response = await notion.users.list();
  return response
}

async function getUserIdFromName(name){
  const users = await retrieveUsers();
  const usersArray = users['results'];
  const userObj = usersArray.find(e => e.name === name)
  return userObj
}

const user = await getUserIdFromName("Finn Macken")
