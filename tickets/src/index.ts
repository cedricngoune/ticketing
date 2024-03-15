import mongoConnect from "./db/mongo-connect";

import { app } from "./app";
import { natsWrapper } from "./nats-wrapper";
const port = 3000;

const start = async () => {
  await natsWrapper.connect("ticketing", "myClientId", "http://nats-srv:4222");

  // Close connection to NATS
  natsWrapper.client.on("close", () => {
    console.log("Nats connection closed");
    process.exit();
  });
  process.on("SIGINT", () => natsWrapper.client.close());
  process.on("SIGTERM", () => natsWrapper.client.close());

  await mongoConnect;
  app.listen(port, () => {
    console.log(`Server running at ${port} 🚀`);
  });
};
start();
