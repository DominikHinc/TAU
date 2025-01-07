const request = require("supertest");
const { app, users } = require("./index");

describe("User API", () => {
  it("GET /users - should return list of users", async () => {
    const res = await request(app).get("/users");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(users);
  });

  it("GET /users/:id - should return user data if user exists", async () => {
    const res = await request(app).get("/users/1");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(users[1]);
  });

  it("GET /users/:id - should return 404 if user does not exist", async () => {
    const res = await request(app).get("/users/999");
    expect(res.statusCode).toEqual(404);
    expect(res.text).toEqual("User not found");
  });

  it("POST /users - should add a new user", async () => {
    const newUser = { name: "Adam Nowak", email: "adam@nowak.pl" };

    const res = await request(app).post("/users").send(newUser);
    expect(res.statusCode).toEqual(201);
    expect(res.body).toMatchObject(newUser);
  });

  it("POST /users - should return 400 if name or email is missing", async () => {
    const res = await request(app).post("/users").send({});
    expect(res.statusCode).toEqual(400);
    expect(res.text).toEqual("Name and email have been passed incorrectly");
  });

  it("PUT /users/:id - should update user data", async () => {
    const updatedUser = {
      name: "Jan Kowalski Updated",
      email: "jan@kowalski.updated.pl",
    };

    const res = await request(app).put("/users/1").send(updatedUser);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toMatchObject(updatedUser);

    const res2 = await request(app).get("/users/1");
    expect(res2.body).toMatchObject(updatedUser);
  });

  it("PUT /users/:id - should return 404 if user does not exist", async () => {
    const updatedUser = { name: "Nonexistent User" };

    const res = await request(app).put("/users/999").send(updatedUser);
    expect(res.statusCode).toEqual(404);
    expect(res.text).toEqual("User not found");
  });

  it("DELETE /users/:id - should delete user", async () => {
    const res = await request(app).delete("/users/1");
    expect(res.statusCode).toEqual(200);
    expect(res.text).toEqual("User deleted");

    const res2 = await request(app).get("/users/1");
    expect(res2.statusCode).toEqual(404);
    expect(res2.text).toEqual("User not found");
  });

  it("DELETE /users/:id - should return 404 if user does not exist", async () => {
    const res = await request(app).delete("/users/999");
    expect(res.statusCode).toEqual(404);
    expect(res.text).toEqual("User not found");
  });
});
