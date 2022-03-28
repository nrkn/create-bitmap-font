"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultOptions = void 0;
const util_1 = require("./util");
const defaultFill = [255, 255, 255, 255];
const defaultBg = [0, 0, 0, 255];
const defaultCodePoints = (0, util_1.createSeq)(95, i => i + 32);
exports.defaultOptions = {
    fill: defaultFill,
    bg: defaultBg,
    codes: defaultCodePoints,
    drawGuides: false
};
//# sourceMappingURL=options.js.map