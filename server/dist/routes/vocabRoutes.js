"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Word_1 = require("../models/Word");
const router = express_1.default.Router();
// Get all words
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield Word_1.Word.find();
    res.json(products);
}));
//save words to mongodb
router.post("/newWords", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const input = req.body;
        const newDataArray = Array.isArray(input) ? input : [input];
        const savedWords = yield Promise.all(newDataArray.map((wordData) => __awaiter(void 0, void 0, void 0, function* () {
            const newWord = new Word_1.Word(wordData);
            yield newWord.save();
        })));
        res.json(savedWords);
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ err: err.message });
        }
    }
}));
exports.default = router;
