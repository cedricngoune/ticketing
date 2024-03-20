import express from "express";
import "express-async-errors";
import bodyParser, { json } from "body-parser";
import { errorHandler, NotFoundError, currentUser } from "@gotickets/common";
import cookieSession from "cookie-session";
import { indexOrderRouter } from "./routes";
import { newOrderRouter } from "./routes/new";
import { showOrderRouter } from "./routes/show";
import { deleteRouter } from "./routes/delete";

const app = express();
app.set("trust proxy", true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test",
  })
);
app.use(currentUser);
app.use(newOrderRouter);
app.use(showOrderRouter);
app.use(indexOrderRouter);
app.use(deleteRouter);

app.use(bodyParser.urlencoded({ extended: false }));

app.all("*", async (req, res) => {
  throw new NotFoundError();
});
app.use(errorHandler);

export { app };
