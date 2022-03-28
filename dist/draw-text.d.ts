import { Canvas } from '@napi-rs/canvas';
export declare const drawText: (sourceCanvas: Canvas, offsets: Record<number, TextMetrics>, spaceSize?: number) => (text: string, tight?: boolean) => Canvas;
export declare const measureWidth: (offsets: Record<number, TextMetrics>, height: number, spaceSize?: number) => (text: string, tight?: boolean) => number;
export declare const drawTextCustom: (cb: (sx: number, sy: number, sw: number, sh: number, dx: number, dy: number) => void, offsets: Record<number, TextMetrics>, height: number, spaceSize?: number) => (text: string, tight?: boolean) => void;
