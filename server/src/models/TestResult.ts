import type { ITest } from "./TestItem";
import { TestItemSchema } from "./TestItem";
import { Schema, model, Types } from "mongoose";

export interface IResult {
  _id?: Types.ObjectId;
  date: string;
  testItems: ITest[];
  deckId: number;
}
const ResultSchema = new Schema<IResult>({
  // id: { type: String, required: true, unique: true },
  date: { type: String, required: true },
  testItems: [TestItemSchema],
  deckId: { type: Number, required: true },
});

export const TestResult = model<IResult>("TestResult", ResultSchema, "results");
