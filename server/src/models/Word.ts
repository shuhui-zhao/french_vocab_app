import { Schema, model } from "mongoose";

interface IWord {
  id: number;
  word: string;
  type: string;
  definition: string;
  starred: boolean;
  example: string;
}

const WordSchema = new Schema<IWord>({
  id: { type: Number, required: true },
  word: { type: String, required: true },
  type: { type: String, required: true },
  definition: { type: String, required: true },
  starred: { type: Boolean, required: true },
  example: { type: String, required: true },
});

export const Word = model<IWord>("Word", WordSchema, "words");
