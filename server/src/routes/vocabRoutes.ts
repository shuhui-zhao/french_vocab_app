import express, { Request, Response } from "express";
import { Word } from "../models/Word";

const router = express.Router();

// Get all words
router.get("/", async (req, res) => {
  const products = await Word.find();
  res.json(products);
});

//save words to mongodb
router.post("/newWords", async (req, res) => {
  try {
    const input = req.body;

    const newDataArray = Array.isArray(input) ? input : [input];
    const savedWords = await Promise.all(
      newDataArray.map(async (wordData) => {
        const newWord = new Word(wordData);
        await newWord.save();
      })
    );
    res.json(savedWords);
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).json({ err: err.message });
    }
  }
});

export default router;
