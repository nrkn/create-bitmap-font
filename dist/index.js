"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBitmapFont = exports.measureWidth = exports.drawTextCustom = exports.drawText = void 0;
const canvas_1 = require("@napi-rs/canvas");
const options_1 = require("./options");
const util_1 = require("./util");
var draw_text_1 = require("./draw-text");
Object.defineProperty(exports, "drawText", { enumerable: true, get: function () { return draw_text_1.drawText; } });
Object.defineProperty(exports, "drawTextCustom", { enumerable: true, get: function () { return draw_text_1.drawTextCustom; } });
Object.defineProperty(exports, "measureWidth", { enumerable: true, get: function () { return draw_text_1.measureWidth; } });
const createBitmapFont = (font, fontSize, opts = {}) => {
    const { fill, bg, drawGuides, codes } = Object.assign({}, options_1.defaultOptions, opts);
    // colors
    const fillCss = rgbaToCss(fill);
    const bgCss = rgbaToCss(bg);
    // font
    const id = (0, util_1.randId)();
    canvas_1.GlobalFonts.register(font, id);
    // measure
    let canvas = (0, canvas_1.createCanvas)(320, 240);
    let ctx = canvas.getContext('2d');
    ctx.font = `${fontSize}px ${id}`;
    const offsets = {};
    for (const code of codes) {
        const c = String.fromCharCode(code);
        const met = ctx.measureText(c);
        offsets[code] = met;
    }
    let maxAscent = 0;
    let maxDescent = 0;
    const totalWidth = codes.reduce((prev, curr) => {
        let met = offsets[curr];
        // force override the metric
        let width = Math.ceil(met.width) + 2;
        offsets[curr] = Object.assign({}, met, { width });
        maxAscent = Math.max(maxAscent, met.actualBoundingBoxAscent);
        maxDescent = Math.max(maxDescent, met.actualBoundingBoxDescent);
        return prev + width;
    }, 0);
    const height = maxAscent + maxDescent + 2;
    // draw
    canvas = (0, canvas_1.createCanvas)(totalWidth, height);
    ctx = canvas.getContext('2d');
    ctx.font = `${fontSize}px ${id}`;
    ctx.textAlign = 'left';
    ctx.fillStyle = bgCss;
    ctx.fillRect(0, 0, totalWidth, height);
    // guides
    let x = 0;
    if (drawGuides) {
        ctx.fillStyle = '#39f';
        let alt = true;
        for (const code of codes) {
            const met = offsets[code];
            if (alt)
                ctx.fillRect(x, 0, met.width, height);
            x += met.width;
            alt = !alt;
        }
        ctx.strokeStyle = 'none';
        ctx.lineWidth = 0;
    }
    // sprite font
    x = 0;
    ctx.fillStyle = fillCss;
    for (const code of codes) {
        const met = offsets[code];
        const c = String.fromCharCode(code);
        const cx = x + 1;
        ctx.fillText(c, cx, height - maxDescent - 1);
        x += met.width;
    }
    const imageData = ctx.getImageData(0, 0, totalWidth, height);
    const pngBuffer = canvas.toBuffer('image/png');
    return { offsets, pngBuffer, imageData, canvas };
};
exports.createBitmapFont = createBitmapFont;
const rgbaToCss = ([r, g, b, a]) => `rgba(${[r, g, b, Math.floor(a / 255 * 100)].join()})`;
//# sourceMappingURL=index.js.map