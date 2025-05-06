"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Word = void 0;
const mongoose_1 = require("mongoose");
const WordSchema = new mongoose_1.Schema({
    id: { type: Number, required: true },
    word: { type: String, required: true },
    type: { type: String, required: true },
    definition: { type: String, required: true },
    starred: { type: Boolean, required: true },
    example: { type: String, required: true },
});
exports.Word = (0, mongoose_1.model)("Word", WordSchema);
