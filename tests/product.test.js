import { connection } from "mongoose";
import supertest from "supertest";
import app from "../app.js";

const api = supertest(app);

test("notes are returned as json", async () => {
  await api
    .get("/api/products")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

afterAll(async () => {
  await connection.close();
});
