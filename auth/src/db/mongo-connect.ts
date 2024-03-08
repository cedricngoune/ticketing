import mongoose from "mongoose";

export default (async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be defined");
  }
  try {
    await mongoose.connect("mongodb://auth-mongo-srv:27017/auth");
    console.log("Connected to db");
  } catch (e) {
    console.log(e);
  }
})();
