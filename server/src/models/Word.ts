import { Schema, model } from "mongoose";

export interface IWord {
  id: number;
  deckId: number;
  word: string;
  type: string;
  definition: string;
  starred: boolean;
  example: string;
}

const WordSchema = new Schema<IWord>({
  id: { type: Number, required: true, unique: true },
  deckId: { type: Number, required: true, unique: true },
  word: { type: String, required: true },
  type: { type: String, required: true },
  definition: { type: String, required: true },
  starred: { type: Boolean, required: true },
  example: { type: String, required: true },
});

export const Word = model<IWord>("Word", WordSchema, "words");
