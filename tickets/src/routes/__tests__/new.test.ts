import request from "supertest";
import { app } from "../../app";
import { Ticket } from "../../models/ticket";
import { natsWrapper } from "../../nats-wrapper";

it("has a route handler listening to /api/tickets for post request", async () => {
  const response = await request(app).post("/api/tickets").send({});
  expect(response.status).not.toEqual(404);
});

it("can only be accessed if the user is signed in ", async () => {
  await request(app).post("/api/tickets").send({}).expect(401);
});

it("returns other than status 401 if user is signed in", async () => {
  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", signin())
    .send({});
  expect(response.status).not.toEqual(401);
});
it("returns an error if invalid title is provided", async () => {
  await request(app)
    .post("/api/tickets")
    .set("Cookie", signin())
    .send({
      title: "",
      price: 10,
    })
    .expect(400);
  await request(app)
    .post("/api/tickets")
    .set("Cookie", signin())
    .send({
      price: 10,
    })
    .expect(400);
});
it("returns an error if invalid price is provided", async () => {
  await request(app)
    .post("/api/tickets")
    .set("Cookie", signin())
    .send({
      title: "zer",
      price: -10,
    })
    .expect(400);

  await request(app)
    .post("/api/tickets")
    .set("Cookie", signin())
    .send({
      title: "title",
    })
    .expect(400);
});
it("reads a ticket with valid inputs", async () => {
  let tickets = await Ticket.find({});
  expect(tickets.length).toEqual(0);
  await request(app)
    .post("/api/tickets")
    .set("Cookie", signin())
    .send({
      title: "ezre",
      price: 20,
    })
    .expect(201);

  tickets = await Ticket.find({});
  expect(tickets.length).toEqual(1);
  expect(tickets[0].price).toEqual(20);
  expect(tickets[0].title).toEqual("ezre");
});

it("publishes and event", async () => {
  await request(app)
    .post("/api/tickets")
    .set("Cookie", signin())
    .send({
      title: "ezre",
      price: 20,
    })
    .expect(201);

  expect(natsWrapper.client.publish).toHaveBeenCalled();
});
