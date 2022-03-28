import { createCanvas, GlobalFonts } from '@napi-rs/canvas'
import { defaultOptions, Options } from './options'
import { randId } from './util'

export const createBitmapFont = (
  font: Buffer, fontSize: number, opts: Partial<Options> = {}
) => {
  const { fill, bg, drawGuides, codes } = Object.assign(
    {}, defaultOptions, opts
  )

  let fillCss = ''
  let bgCss = ''

  // colors
  {
    let [rr, rg, rb, ra] = bg

    ra = Math.floor(ra / 255 * 100)

    bgCss = `rgba(${[rr, rg, rb, ra].join()})`
  }

  {
    let [fr, fg, fb, fa] = fill

    fa = Math.floor(fa / 255 * 100)

    fillCss = `rgba(${[fr, fg, fb, fa].join()})`
  }

  // font
  const id = randId()

  GlobalFonts.register(font, id)

  // measure
  let canvas = createCanvas(320, 240)
  let ctx = canvas.getContext('2d')

  ctx.font = `${fontSize}px ${id}`

  const offsets: Record<number, TextMetrics> = {}

  for (const code of codes) {
    const c = String.fromCharCode(code)
    const met = ctx.measureText(c)

    offsets[code] = met
  }

  let maxAscent = 0
  let maxDescent = 0

  const totalWidth = codes.reduce(
    (prev, curr) => {
      let met = offsets[curr]

      // force override the metric
      let width = Math.ceil(met.width) + 2
      offsets[curr] = Object.assign({}, met, { width })

      maxAscent = Math.max(maxAscent, met.actualBoundingBoxAscent)
      maxDescent = Math.max(maxDescent, met.actualBoundingBoxDescent)

      return prev + width
    },
    0
  )

  const height = maxAscent + maxDescent + 2

  // draw

  canvas = createCanvas(totalWidth, height)
  ctx = canvas.getContext('2d')

  ctx.font = `${fontSize}px ${id}`
  ctx.textAlign = 'left'
  ctx.fillStyle = bgCss

  ctx.fillRect(0, 0, totalWidth, height)

  // guides

  let x = 0
  
  if (drawGuides) {    
    ctx.fillStyle = '#39f'

    let alt = true

    for (const code of codes) {
      const met = offsets[code]

      if (alt) ctx.fillRect(x, 0, met.width, height)

      x += met.width
      alt = !alt
    }

    ctx.strokeStyle = 'none'
    ctx.lineWidth = 0
  }

  // sprite font

  x = 0

  ctx.fillStyle = fillCss

  for (const code of codes) {
    const met = offsets[code]
    const c = String.fromCharCode(code)
    const cx = x + 1

    ctx.fillText(c, cx, height - maxDescent - 1)

    x += met.width
  }

  const imageData = ctx.getImageData( 0, 0, totalWidth, height )

  const pngBuffer = canvas.toBuffer('image/png')

  return { offsets, pngBuffer, imageData, canvas }
}

export { drawText, drawTextCustom, measureWidth } from './draw-text'
