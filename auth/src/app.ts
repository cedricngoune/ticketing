import express from "express";
import "express-async-errors";
import bodyParser, { json } from "body-parser";

import cookieSession from "cookie-session";
import { currentUserRouter } from "./routes/current-user";
import { registerRouter } from "./routes/register";
import { loginRouter } from "./routes/login";
import { logoutRouter } from "./routes/logout";
import { errorHandler } from "./middlewares/error-handler";
import { NotFoundError } from "./errors/not-found";

const app = express();
app.set("trust proxy", true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test",
  })
);
app.use(bodyParser.urlencoded({ extended: false }));

app.use(currentUserRouter);
app.use(loginRouter);
app.use(registerRouter);
app.use(logoutRouter);

app.all("*", async (req, res) => {
  throw new NotFoundError();
});
app.use(errorHandler);

export { app };
