import express from "express";
import "express-async-errors";
import bodyParser, { json } from "body-parser";
import mongoose from "mongoose";
import { currentUserRouter } from "./routes/current-user";
import { registerRouter } from "./routes/register";
import { loginRouter } from "./routes/login";
import { logoutRouter } from "./routes/logout";
import { errorHandler } from "./middlewares/error-handler";
import { NotFoundError } from "./errors/not-found";

const port = 3000;
const app = express();
app.use(json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(currentUserRouter);
app.use(loginRouter);
app.use(registerRouter);
app.use(logoutRouter);

app.all("*", async (req, res) => {
  throw new NotFoundError();
});
app.use(errorHandler);

const start = async () => {
  try {
    await mongoose.connect("mongodb://auth-mongo-srv:27017/auth");
    console.log("Connected to db");
  } catch (e) {
    console.log(e);
  }
  app.listen(port, () => {
    console.log(`Server running at ${port} 🚀`);
  });
};
start();
