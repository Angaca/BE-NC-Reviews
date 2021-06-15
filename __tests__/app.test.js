const db = require("../db/connection.js");
const testData = require("../db/data/test-data/index.js");
const seed = require("../db/seeds/seed.js");
const request = require("supertest");
const app = require("../app");

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe("ALL /*", () => {
  test("404 - should return a 404 with a Not found msg for invalid path", async () => {
    let { body } = await request(app).get("/whatever").expect(404);
    expect(body.msg).toBe("Not found");
  });
});

describe("GET /api/categories", () => {
  test("status 200 - should return an object with an array of categories", async () => {
    const { body } = await request(app).get("/api/categories").expect(200);
    expect(body.categories).toHaveLength(4);
    body.categories.forEach((category) => {
      expect(category).toEqual(
        expect.objectContaining({
          slug: expect.any(String),
          description: expect.any(String),
        })
      );
    });
  });
});

describe("GET /api/reviews/:review_id", () => {
  test("status 200 - should return an array of a single object of a single review", async () => {
    const { body } = await request(app).get("/api/reviews/2").expect(200);
    console.log(body);
    expect(body.review).toHaveLength(1);
    expect(body.review[0]).toEqual(
      expect.objectContaining({
        review_id: 2,
        title: expect.any(String),
        review_body: expect.any(String),
        designer: expect.any(String),
        review_img_url: expect.any(String),
        votes: expect.any(Number),
        category: expect.any(String),
        owner: expect.any(String),
        created_at: expect.any(String),
        comment_count: 3,
      })
    );
  });
  test("status 400 - should return a 400 Bad request for an invalid id", async () => {
    const { body } = await request(app).get("/api/reviews/NaN").expect(400);
    expect(body.msg).toBe("Invalid id");
  });
  test("status 404 - should return 404 for a non existing id", async () => {
    const { body } = await request(app).get("/api/reviews/1000").expect(404);
    expect(body.msg).toBe("Not found");
  });
});

describe("PATCH /api/reviews/:review_id", () => {
  test("status 202 - should update the id specified review and return it inside a single object", async () => {
    const patch = { review_body: "That's a better review!" };
    const { body } = await request(app)
      .patch("/api/reviews/1")
      .send(patch)
      .expect(202);
    expect(body.review).toHaveLength(1);
    expect(body.review[0]).toEqual(
      expect.objectContaining({
        review_id: expect.any(Number),
        title: expect.any(String),
        review_body: "That's a better review!",
        designer: expect.any(String),
        review_img_url: expect.any(String),
        votes: expect.any(Number),
        category: expect.any(String),
        owner: expect.any(String),
        created_at: expect.any(String),
      })
    );
  });
});
