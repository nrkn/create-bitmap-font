
export const randomInt = (exclMax: number) =>
  Math.floor(Math.random() * exclMax)

export const createSeq = <T>(length: number, cb: (i: number) => T) =>
  Array.from({ length }, (_v, k) => cb(k))

export const randId = () => createSeq(
  32,
  () => randomInt(16)
).map(
  v => v.toString(16)
).join('')
