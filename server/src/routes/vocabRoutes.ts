import express, { Request, Response } from "express";
import { Word } from "../models/Word";
import { Deck } from "../models/Deck";

const router = express.Router();

// Get all words
router.get("/words", async (req, res) => {
  const words = await Word.find();
  res.json(words);
});

//Get all decks
router.get("/decks", async (req, res) => {
  const decks = await Deck.find();
  res.json(decks);
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

//save decks info to mongodb
router.post("/newDecks", async (req, res) => {
  try {
    const input = req.body;

    const newDataArray = Array.isArray(input) ? input : [input];
    const savedDecks = await Promise.all(
      newDataArray.map(async (deckData) => {
        const newDeck = new Deck(deckData);
        await newDeck.save();
      })
    );
    res.json(savedDecks);
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).json({ err: err.message });
    }
  }
});

//delete deck by id
router.delete("/decks/delete/:id", async (req: any, res: Response) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    res.json({ error: "Invalid numeric ID" });
  }
  try {
    const deletedDeck = await Deck.findOneAndDelete({ id });
    if (!deletedDeck) {
      res.status(404).json({ error: "Deck not found" });
    }
    res.json(deletedDeck);
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.json({ err: err.message });
    }
    res.status(500).json({ error: "Unknown error" });
  }
});
export default router;
