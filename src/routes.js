import { randomUUID } from 'crypto'
import { Database } from "./database.js"
import { buildRoutePath } from './utils/build-route-path.js'

const database = new Database()

export const routes = [
  //get
  {
    method: 'GET',
    path: buildRoutePath('/users'),
    handler: (req, res) => {
      const users = database.select('users')

      return res.end(JSON.stringify(users))
    }
  },
  //post
  {
    method: 'POST',
    path: buildRoutePath('/users'),
    handler: (req, res) => {
      const { name, email } = req.body
      
      const user = {
        id: randomUUID(),
        name,
        email,
      }
  
      database.insert('users', user)
  
      return res.writeHead(201).end();
    }
  },
  //delete
  {
    method: 'DELETE',
    path: buildRoutePath('/users/:id'),
    handler: (req, res) => {
      res.end()
    }
  }
]