import { Schema, model } from "mongoose";

interface IDeck {
  id: number;
  name: string;
}

const DeckSchema = new Schema<IDeck>({
  id: { type: Number, required: true },
  name: { type: String, required: true },
});

export const Deck = model<IDeck>("Deck", DeckSchema, "decks");
