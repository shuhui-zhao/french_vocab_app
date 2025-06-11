import { Schema, model } from "mongoose";

export interface ITest {
  id: number;
  testWord: string;
  definition: string;
  entered?: string;
  starred: boolean;
}

export const TestItemSchema = new Schema<ITest>({
  id: { type: Number, required: true, unique: true },
  testWord: { type: String, required: true },
  definition: { type: String, required: true },
  entered: { type: String },
  starred: { type: Boolean, required: true },
});
