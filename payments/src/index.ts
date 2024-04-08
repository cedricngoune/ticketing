import { app } from "./app";
import { natsWrapper } from "./nats-wrapper";
import mongoose from "mongoose";
import { OrderCancelledListener } from "./events/listeners/order-cancelled-listener";
import { OrderCreatedListener } from "./events/listeners/order-created-listener";

const start = async () => {
  const port = 3000;
  console.log("Starting up...");
  if (!process.env.NATS_CLIENT_ID) {
    throw new Error("NATS_CLIENT_ID must be defined");
  }
  if (!process.env.NATS_URL) {
    throw new Error("NATS_URL must be defined");
  }
  if (!process.env.NATS_CLUSTER_ID) {
    throw new Error("NATS_CLUSTER_ID must be defined");
  }
  if (!process.env.JWT_KEY) {
    throw new Error("Missing JWT_KEY value");
  }
  if (!process.env.MONGO_URI) {
    throw new Error("Missing MONGO_URI value");
  }
  try {
    await natsWrapper.connect(
      process.env.NATS_CLUSTER_ID,
      process.env.NATS_CLIENT_ID,
      process.env.NATS_URL
    );

    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to db");
    // Close connection to NATS
    natsWrapper.client.on("close", () => {
      console.log("Nats connection closed");
      process.exit();
    });
    process.on("SIGINT", () => natsWrapper.client.close());
    process.on("SIGTERM", () => natsWrapper.client.close());

    new OrderCreatedListener(natsWrapper.client).listen();
    new OrderCancelledListener(natsWrapper.client).listen();
  } catch (err) {
    console.error(err);
  }

  app.listen(port, () => {
    console.log(`Server running at ${port} 🚀`);
  });
};
start();
