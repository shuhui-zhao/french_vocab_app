import { Schema, model } from "mongoose";

export interface IDeck {
  id: number;
  name: string;
}

const DeckSchema = new Schema<IDeck>({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
});

export const Deck = model<IDeck>("Deck", DeckSchema, "decks");
