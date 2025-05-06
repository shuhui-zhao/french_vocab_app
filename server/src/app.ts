import express from "express";
import { connect } from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import vocabRoutes from "./routes/vocabRoutes";

dotenv.config();
const app = express();
const port = 3001;
app.use(cors());
app.use(express.json());
app.use("/api", vocabRoutes);

// Connect to MongoDB
const MONGO_URL: string = process.env.MONGO_URL ?? "";

if (!MONGO_URL) {
  console.error("MONGO_URL is not set");
  process.exit();
}
connect(MONGO_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error", err));

// Start server

app.get("/", (req, res) => {
  res.send("Get request received");
});

app.listen(port, () => {
  return console.log(`Express is listening at http:localhost:${port}`);
});

export default app;
