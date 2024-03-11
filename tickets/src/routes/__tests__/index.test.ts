import request from "supertest";
import { app } from "../../app";

const buildTicket = () => {
  return request(app).post("/api/tickets").set("Cookie", signin()).send({
    title: "blalabla",
    price: 20,
  });
};
it("fetch a list of tickets", async () => {
  await buildTicket();
  await buildTicket();
  await buildTicket();

  const response = await request(app).get("/api/tickets").send().expect(200);
  expect(response.body.length).toEqual(3);
});
