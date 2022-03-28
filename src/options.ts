import { Tuple4 } from './types'
import { createSeq } from './util'

const defaultFill: Tuple4 = [255, 255, 255, 255]
const defaultBg: Tuple4 = [0, 0, 0, 255]
const defaultCodePoints: number[] = createSeq(95, i => i + 32)

export const defaultOptions = {
  fill: defaultFill,
  bg: defaultBg,
  codes: defaultCodePoints,
  drawGuides: false as boolean
} as const

export type Options = typeof defaultOptions