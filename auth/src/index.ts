import express from "express";
import { json } from "body-parser";

const port = 3000;
const app = express();
app.use(json());

app.get("/api/users/currentuser", (req, res) => {
  res.send("Hello world!");
});

app.listen(port, () => {
  console.log(`Server auth running at ${port} 🚀`);
});
