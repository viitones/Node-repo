import http from 'node:http';
import { randomUUID } from 'node:crypto'
import { json } from './middlewares/json.js';
import { Database } from './database.js';

const database = new Database()

const server = http.createServer( async(req, res) => {
  const { method, url } = req;

  await json(req, res)
  
  if (url === '/users' && method === 'GET') {
    const users = database.select('users')

    return res.end(JSON.stringify(users))
  }

  if (url === '/users' && method === 'POST') {
    const { name, email } = req.body

    const user = {
      id: randomUUID(),
      name,
      email,
    }

    database.insert('users', user)

    return res.writeHead(201).end();
  }

  return res.writeHead(404).end();
});

server.listen(3333)