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
        comment_count: "3",
      })
    );
  });
  test("status 400 - should return a 400 Bad request for an invalid id", async () => {
    const { body } = await request(app).get("/api/reviews/NaN").expect(400);
    expect(body.msg).toBe("Invalid type of data");
  });
  test("status 404 - should return 404 for a non existing id", async () => {
    const { body } = await request(app).get("/api/reviews/1000").expect(404);
    expect(body.msg).toBe("Not found");
  });
});

describe("PATCH /api/reviews/:review_id", () => {
  test("status 200 - should update the votes of the id specified review and return it inside a single object", async () => {
    const patch = { inc_votes: 3 };
    const { body } = await request(app)
      .patch("/api/reviews/1")
      .send(patch)
      .expect(200);
    expect(body.review).toHaveLength(1);
    expect(body.review[0]).toEqual(
      expect.objectContaining({
        review_id: expect.any(Number),
        title: expect.any(String),
        review_body: expect.any(String),
        designer: expect.any(String),
        review_img_url: expect.any(String),
        votes: 4,
        category: expect.any(String),
        owner: expect.any(String),
        created_at: expect.any(String),
      })
    );
  });
  test("status 400 - should return a 400 Bad request for an invalid id", async () => {
    const patch = { inc_votes: 3 };
    const { body } = await request(app)
      .patch("/api/reviews/NaN")
      .send(patch)
      .expect(400);
    expect(body.msg).toBe("Invalid type of data");
  });
  test("status 404 - should return 404 for a non existing id", async () => {
    const patch = { inc_votes: 3 };
    const { body } = await request(app)
      .patch("/api/reviews/1000")
      .send(patch)
      .expect(404);
    expect(body.msg).toBe("Not found");
  });
  test("status 400 - should return 400 for an invalid votes increase amount", async () => {
    const patch = { inc_votes: "NaN" };
    const { body } = await request(app)
      .patch("/api/reviews/1")
      .send(patch)
      .expect(400);
    expect(body.msg).toBe("Invalid type of data");
  });
  test("status 400 - should return 400 Bad request for a malformed body (missing inc_votes)", async () => {
    const { body } = await request(app)
      .patch("/api/reviews/1")
      .send({})
      .expect(400);
    expect(body.msg).toBe("Malformed body");
  });
});

describe("GET /api/reviews", () => {
  test("status 200 - should return an array of all the reviews", async () => {
    const { body } = await request(app).get("/api/reviews").expect(200);
    expect(body.reviews).toHaveLength(13);
    body.reviews.forEach((review) => {
      expect(review).toEqual(
        expect.objectContaining({
          review_id: expect.any(Number),
          title: expect.any(String),
          review_body: expect.any(String),
          designer: expect.any(String),
          review_img_url: expect.any(String),
          votes: expect.any(Number),
          category: expect.any(String),
          owner: expect.any(String),
          created_at: expect.any(String),
          comment_count: expect.any(String),
        })
      );
    });
  });
  test("status 200 - should sort_by default DESC order by date", async () => {
    const { body } = await request(app).get("/api/reviews").expect(200);
    expect(body.reviews[0].created_at).toBe("2021-01-25T11:16:54.963Z");
    expect(body.reviews[12].created_at).toBe("1970-01-10T02:08:38.400Z");
  });
  test("status 200 - should sort_by by any valid given column", async () => {
    const { body } = await request(app)
      .get("/api/reviews?sort_by=designer")
      .expect(200);
    expect(body.reviews[0].designer).toBe("Wolfgang Warsch");
    expect(body.reviews[12].designer).toBe("Akihisa Okui");
  });
  test("status 200 - should allow to change the order of the sort_by by any valid given column", async () => {
    const { body } = await request(app)
      .get("/api/reviews?sort_by=title&order=asc")
      .expect(200);
    expect(body.reviews[0].title).toBe(
      "A truly Quacking Game; Quacks of Quedlinburg"
    );
    expect(body.reviews[12].title).toBe("Ultimate Werewolf");
  });
  test("status 200 - should filter the results by the category query", async () => {
    const { body } = await request(app)
      .get("/api/reviews?category=social deduction")
      .expect(200);
    body.reviews.forEach((review) => {
      expect(review).toEqual(
        expect.objectContaining({
          category: "social deduction",
        })
      );
    });
  });
  test("status 400 - should return Invalid request if given an invalid column", async () => {
    const { body } = await request(app)
      .get("/api/reviews?sort_by=notAColumn")
      .expect(400);
    expect(body.msg).toBe("Invalid sort query");
  });
  test("status 400 - should return Invalid request if given an invalid order method", async () => {
    const { body } = await request(app)
      .get("/api/reviews?order=notAnOrder")
      .expect(400);
    expect(body.msg).toBe("Invalid order query");
  });
  test("status 400 - should return Invalid request if given an invalid category not present in the db", async () => {
    const { body } = await request(app)
      .get("/api/reviews?category=notACategory")
      .expect(400);
    expect(body.msg).toBe("Invalid category query");
  });
  test("status 200 - should return empty object if request with a valid category with no entries in the table", async () => {
    const { body } = await request(app)
      .get("/api/reviews?category=children's games")
      .expect(200);
    expect(body.reviews).toEqual([]);
  });
});

describe("GET /api/reviews/:review_id/comments", () => {
  test("status 200 - should respond with an array of comments for the given review_id", async () => {
    const { body } = await request(app)
      .get("/api/reviews/2/comments")
      .expect(200);
    expect(body.comments).toHaveLength(3);
    body.comments.forEach((comment) => {
      expect(comment).toEqual(
        expect.objectContaining({
          comment_id: expect.any(Number),
          votes: expect.any(Number),
          created_at: expect.any(String),
          author: expect.any(String),
          body: expect.any(String),
        })
      );
    });
  });
  test("status 404 - should return a 404 Not found for an invalid id", async () => {
    const { body } = await request(app)
      .get("/api/reviews/NaN/categories")
      .expect(404);
    expect(body.msg).toBe("Not found");
  });
});

describe("POST /api/reviews/:review_id/comments", () => {
  test("status 201 - should add a new comment and return it to confirm all is ok", async () => {
    const newComment = {
      username: "bainesface",
      body: "Yes! Amazing :)",
    };
    const { body } = await request(app)
      .post("/api/reviews/2/comments")
      .send(newComment)
      .expect(201);
    expect(body.comment[0].author).toBe("bainesface");
    expect(body.comment[0].body).toBe("Yes! Amazing :)");
  });
});

describe("DELETE /api/comments/:comment_id", () => {
  test("status 204 - should delete the comment given its id", async () => {
    const { body } = await request(app).delete("/api/comments/1").expect(204);
    expect(body).toEqual({});
  });
});

describe("GET /api/users", () => {
  test("status 200 - should respond with an array of object with any object having the username property as the only value", async () => {
    const { body } = await request(app).get("/api/users").expect(200);
    expect(body).toHaveLength(4);
    body.forEach((user) => {
      expect(user).toEqual(
        expect.objectContaining({
          username: expect.any(String),
        })
      );
    });
  });
});

describe("GET /api/users/:username", () => {
  test("status 200 - should respond with an user object by its username", async () => {
    const { body } = await request(app)
      .get("/api/users/bainesface")
      .expect(200);
    expect(body.user[0]).toEqual(
      expect.objectContaining({
        username: "bainesface",
        avatar_url:
          "https://avatars2.githubusercontent.com/u/24394918?s=400&v=4",
        name: "sarah",
      })
    );
  });
});
