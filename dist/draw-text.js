"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.drawText = void 0;
const canvas_1 = require("@napi-rs/canvas");
const drawText = (sourceCanvas, offsets, spaceSize = Math.floor(sourceCanvas.height / 4)) => (text, tight = false) => {
    const charCodes = text.split('').map(s => s.charCodeAt(0));
    // measure
    const { height } = sourceCanvas;
    const sxMap = new Map();
    let sx = 0;
    for (const c in offsets) {
        const code = Number(c);
        const met = offsets[code];
        sxMap.set(code, sx);
        sx += met.width;
    }
    const width = charCodes.reduce((prev, curr) => {
        // space
        if (curr === 32) {
            return prev + spaceSize;
        }
        const met = offsets[curr];
        if (!met)
            return prev;
        return prev + (tight ? met.width - 2 : met.width);
    }, 2);
    const canvas = (0, canvas_1.createCanvas)(width, height);
    const ctx = canvas.getContext('2d');
    let x = 1;
    for (const code of charCodes) {
        // space
        if (code === 32) {
            x += spaceSize;
            continue;
        }
        const met = offsets[code];
        if (!met)
            continue;
        const sx = sxMap.get(code);
        const sy = 0;
        const sw = met.width;
        const sh = height;
        const dx = x + (tight ? 0 : 1);
        const dy = 0;
        ctx.drawImage(sourceCanvas, sx, sy, sw, sh, dx, dy, sw, sh);
        x += (tight ? met.width - 2 : met.width);
    }
    return canvas;
};
exports.drawText = drawText;
//# sourceMappingURL=draw-text.js.map