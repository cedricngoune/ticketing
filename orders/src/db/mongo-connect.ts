import mongoose from "mongoose";

export default (async () => {
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
})();
