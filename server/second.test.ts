import * as SuperTest from "supertest";
import { app } from "./src/start"
import { Book } from "./src/model/book";

const request = SuperTest.default(app);

test("End-to-end test", async () => {
    const desc = "Test description";
    const res1 = await request.post("/book").send({category : desc});
    expect(res1.statusCode).toEqual(201);
    expect(res1.body.category).toEqual(desc);
    const res2 = await request.get("/book");
    expect(res2.statusCode).toEqual(200);
    expect(res2.body.map((task : Book) => task.category)).toContain(desc);
});