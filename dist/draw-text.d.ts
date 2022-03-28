import { Canvas } from '@napi-rs/canvas';
export declare const drawText: (sourceCanvas: Canvas, offsets: Record<number, TextMetrics>, spaceSize?: number) => (text: string, tight?: boolean) => Canvas;
