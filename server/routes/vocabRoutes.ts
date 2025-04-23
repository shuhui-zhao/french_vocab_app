import express, { Request, Response } from "express";
import { Word } from "../models/Word";

const router = express.Router();

// Get all words
router.get("/", async (req, res) => {
  const products = await Word.find();
  res.json(products);
});

router.post("/newWords", async (req, res) => {
  try {
    const newProduct = new Word(req.body);
    await newProduct.save();
    res.json(newProduct);
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).json({ err: err.message });
    }
  }
});

export default router;
