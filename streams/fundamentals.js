

// process.stdin
//   .pipe(process.stdout)

import { Readable, Transform, Writable } from 'node:stream'
import { buffer } from 'node:stream/consumers'

class OneToHundredStream extends Readable {
  index = 1
  

  _read() {
    const i = this.index++

    setTimeout(() => {
      if( i > 100 ) {
        this.push(null)
      } else {
        const buf = Buffer.from(String(`${i}\n`))
        this.push(buf)
      }
    }, 1000)
  }

}

class InverseNumber extends Transform {
  _transform(chunk, encoding, callback) {
    const num = Number(chunk.toString()) * -1

    callback(null, Buffer.from(String(num)))
  }
}

class MultiplyByTenStream extends Writable {
  _write(chunk, encoding, callback) {
    console.log(Number(chunk.toString()) * 10);
    callback()
  }
}

new OneToHundredStream()
  .pipe(new InverseNumber())
  .pipe(new MultiplyByTenStream())