"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.randId = exports.createSeq = exports.randomInt = void 0;
const randomInt = (exclMax) => Math.floor(Math.random() * exclMax);
exports.randomInt = randomInt;
const createSeq = (length, cb) => Array.from({ length }, (_v, k) => cb(k));
exports.createSeq = createSeq;
const randId = () => (0, exports.createSeq)(32, () => (0, exports.randomInt)(16)).map(v => v.toString(16)).join('');
exports.randId = randId;
//# sourceMappingURL=util.js.map