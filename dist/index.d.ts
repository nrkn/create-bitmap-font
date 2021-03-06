/// <reference types="node" />
import { Options } from './options';
export { drawText, drawTextCustom, measureWidth } from './draw-text';
export declare const createBitmapFont: (font: Buffer, fontSize: number, opts?: Partial<Options>) => {
    offsets: Record<number, TextMetrics>;
    pngBuffer: Buffer;
    imageData: ImageData;
    canvas: import("@napi-rs/canvas").Canvas;
};
