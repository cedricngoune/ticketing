import request from "supertest";
import { app } from "../../app";

it("returns 201 status on successfull signup", async () => {
  return request(app)
    .post("/api/users/register")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(201);
});

it("returns 400 status with an invalid email", async () => {
  return request(app)
    .post("/api/users/register")
    .send({
      email: "ereztest.com",
      password: "password",
    })
    .expect(400);
});

it("returns 400 status with an invalid password", async () => {
  return request(app)
    .post("/api/users/register")
    .send({
      email: "ereztest.com",
      password: "az",
    })
    .expect(400);
});

it("returns 400 status with missing email and password", async () => {
  await request(app)
    .post("/api/users/register")
    .send({
      email: "test@test.com",
    })
    .expect(400);

  await request(app)
    .post("/api/users/register")
    .send({
      password: "password",
    })
    .expect(400);
});

it("disallows duplicate emails", async () => {
  await request(app)
    .post("/api/users/register")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(201);

  await request(app)
    .post("/api/users/register")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(400);
});

it("sets a cookie after succesful signup", async () => {
  const response = await request(app)
    .post("/api/users/register")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(201);

  expect(response.get("Set-Cookie")).toBeDefined();
});
