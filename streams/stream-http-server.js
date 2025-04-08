import http from 'http';
import { Transform } from 'node:stream'

class InverseNumber extends Transform {
  _transform(chunk, encoding, callback) {
    const num = Number(chunk.toString()) * -1

    console.log(num);
    

    callback(null, Buffer.from(String(num)))
  }
}

const server = http.createServer( async (req, res) => {
  const buffers = []

  for await (const chunk of req) {
    buffers.push(chunk)
  }

  const fullStreamContent = Buffer.concat(buffers).toString()
  console.log(fullStreamContent);

  return res.end(fullStreamContent)

})

server.listen(3334)