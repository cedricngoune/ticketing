import mongoConnect from "./db/mongo-connect";

import { app } from "./app";
const port = 3000;

const start = async () => {
  await mongoConnect;
  app.listen(port, () => {
    console.log(`Server running at ${port} 🚀`);
  });
};
start();
