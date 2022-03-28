# create-bitmap-font
 
Create a bitmap sprite font

`npm install @nrkn/create-bitmap-font`

In the example we create a bitmap font and then use it to draw some text:

```js
import { promises } from 'fs'
import { createBitmapFont, drawText } from '@nrkn/create-bitmap-font'

const { readFile, writeFile } = promises

const fill = [0xff, 0xc2, 0x0e, 0xff]
const bg = [ 0, 0, 0, 0 ]

const start = async () => {
  const codes = createSeq(95, i => i + 33)

  const font = await readFile('some-font.otf')
  const bitmapFont = createBitmapFont(font, 32, { fill, bg, codes })

  const { offsets, pngBuffer } = bitmapFont

  // save the bitmap font and the text metrics
  await writeFile('some-font.png', pngBuffer)
  await writeFile( 'some-font.json', JSON.stringify( offsets, null, 2 ), 'utf8' )

  // create text drawing function
  const draw = drawText( bitmapFont.canvas, bitmapFont.offsets )

  // first we will create a round trip and see if it matches the font bitmap

  const text = codes.map( c => String.fromCharCode( c ) ).join( '' )

  const roundTrip = draw( text )

  const roundPng = roundTrip.toBuffer('image/png')

  await writeFile( 'test-round.png', roundPng )

  // now write some arbitrary text

  const testText = 'Hello, world'

  const testDraw = draw( testText )

  const testPng = testDraw.toBuffer( 'image/png' )

  await writeFile( 'test-out.png', testPng )
}

const createSeq = (length, cb) =>
  Array.from({ length }, (_v, k) => cb(k))

start().catch(console.error)
```

## license

MIT License

Copyright (c) 2022 Nik Coughlin

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
