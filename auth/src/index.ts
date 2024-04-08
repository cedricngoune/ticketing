import { app } from "./app";
import mongoose from "mongoose";

const port = 3000;

const start = async () => {
  console.log("starting up..");
  if (!process.env.JWT_KEY) {
    throw new Error("Missing JWT_KEY value");
  }
  if (!process.env.MONGO_URI) {
    throw new Error("Missing MONGO_URI value");
  }
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to db");
  } catch (e) {
    console.log(e);
  }
  app.listen(port, () => {
    console.log(`Server running at ${port} 🚀`);
  });
};
start();
