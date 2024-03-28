import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import afterAll from "supertest";
import jwt from "jsonwebtoken";

declare global {
  var signin: (id?: string) => string[];
}
jest.mock("../nats-wrapper");

process.env.STRIPE_KEY =
  "sk_test_51OyxIiP3DZAp8Ow1hwjyEeR8ExJ8mX32L2fTZ7bAdDCoPfpk6lbOiRhMiJqRZy0t03nshUHFb2ECXprUXuXuVgqI00Wg1z2YHQ";

let mongo: MongoMemoryServer;
beforeAll(async () => {
  process.env.JWT_KEY = "whatever";
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();

  await mongoose.connect(mongoUri, {});
});
beforeEach(async () => {
  jest.clearAllMocks();
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});
afterAll(async () => {
  if (mongo) {
    await mongo.stop();
  }
  await mongoose.connection.close();
});

global.signin = (id?: string) => {
  // build a JWT payload. {id, email}
  const payload = {
    id: id || new mongoose.Types.ObjectId().toHexString(),
    email: "test@test.com",
  };
  //Create the JWT
  const token = jwt.sign(payload, process.env.JWT_KEY!);

  //Build session Object
  const session = { jwt: token };

  // Turn that session into JSON
  const sessionJSON = JSON.stringify(session);

  // Take JSON and endode it as base64
  const base64 = Buffer.from(sessionJSON).toString("base64");

  // Return a string thats the cookie with the encoded data
  return [`session=${base64}`];
};
