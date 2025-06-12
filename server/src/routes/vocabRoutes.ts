import express, { Request, Response } from "express";
import { Word } from "../models/Word";
import { Deck } from "../models/Deck";
import { TestResult } from "../models/TestResult";
import { Types } from "mongoose";
const router = express.Router();

//Get words by id
router.get("/words", async (req, res) => {
  const deckId = parseInt(req.query.deckId as string);

  // console.log(deckId);
  if (isNaN(deckId)) {
    // const words = await Word.find();
    // res.json(words);
    res.json({ error: "invalid deckId" });
  }

  try {
    const words = await Word.find({ deckId });
    res.json(words);
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    }
  }
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
router.delete("/decks/delete/:id", async (req, res) => {
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

//put: update starred words by id
router.put("/words/star/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const starred = req.body.starred;
  if (isNaN(id)) {
    res.json({ error: "Invalid numeric ID" });
  }
  try {
    const updateStarredWord = await Word.findOneAndUpdate(
      { id },
      { starred },
      { new: true }
    );
    if (!updateStarredWord) {
      res.status(404).json({ error: "Word not found" });
    }
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.json({ err: err.message });
    }
    res.status(500).json({ error: "Unknown error" });
  }
});

//update starred word based on test results: update a batch
router.patch("/words/updateStarred", async (req, res) => {
  const input = req.body; // [{ id: 1, starred: true }, ...]
  const updates = Array.isArray(input) ? input : [input];
  try {
    const updatePromises = updates.map(({ id, starred }) =>
      Word.updateOne({ id }, { $set: { starred } })
    );

    await Promise.all(updatePromises);

    res.json({ message: "Words updated successfully." });
  } catch (err) {
    console.error("Failed to update starred values:", err);
    res.status(500).json({ error: "Failed to update words." });
  }
});

//save test results to mongodb

router.post("/testResults", async (req, res) => {
  const input = req.body;

  try {
    const newResult = new TestResult(input);
    const savedResult = await newResult.save(); // Return a single object if only one was saved
    res.status(201).json(savedResult);
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("Error saving test results:", err.message);
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: "Unknown error" });
    }
  }
});

//get the test results by deckId
router.get("/results", async (req, res) => {
  const deckId = parseInt(req.query.deckId as string);
  console.log(deckId);
  if (isNaN(deckId)) {
    const results = await TestResult.find();
    res.json({ error: "invalid deckId" });
  }
  try {
    const results = await TestResult.find({ deckId });
    res.json(results);
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    }
  }
});

//get the results by _id

router.get("/result", async (req, res) => {
  const resultId = new Types.ObjectId(req.query.resultId as string);
  try {
    const results = await TestResult.findOne({ _id: resultId });
    res.json(results);
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    }
  }
});

export default router;
