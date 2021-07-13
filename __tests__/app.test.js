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

describe("GET /api", () => {
  test("status 200 - should respond with a object containing all the available endpoints", async () => {
    const { body } = await request(app).get("/api").expect(200);
    expect(body.msg).toBe("Welcome! Please see the available endpoints below");
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
    expect(body.review).toEqual(
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
    expect(body.msg).toBe("Invalid data");
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
    expect(body.review).toEqual(
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
    expect(body.msg).toBe("Invalid data");
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
    expect(body.msg).toBe("Invalid data");
  });
  test("status 400 - should return 400 Bad request for a malformed body (missing inc_votes or review_body)", async () => {
    const { body } = await request(app)
      .patch("/api/reviews/1")
      .send({})
      .expect(400);
    expect(body.msg).toBe("Malformed body");
  });
  test("status 200 - should accept to patch and change the review body", async () => {
    const patch = { inc_votes: 0, review_body: "This is the new review body!" };
    const { body } = await request(app)
      .patch("/api/reviews/2")
      .send(patch)
      .expect(200);
    expect(body.review).toEqual(
      expect.objectContaining({
        review_id: 2,
        title: "Jenga",
        review_body: "This is the new review body!",
        designer: "Leslie Scott",
        review_img_url: expect.any(String),
        votes: 5,
        category: "dexterity",
        owner: "philippaclaire9",
        created_at: expect.any(String),
      })
    );
  });
});

describe("GET /api/reviews", () => {
  test("status 200 - should return an array of all the reviews", async () => {
    const { body } = await request(app).get("/api/reviews").expect(200);
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
    expect(body.reviews).toBeSortedBy("created_at", { descending: true });
  });
  test("status 200 - should sort_by by any valid given column", async () => {
    const { body } = await request(app)
      .get("/api/reviews?sort_by=designer")
      .expect(200);
    expect(body.reviews).toBeSortedBy("designer", { descending: true });
  });
  test("status 200 - should allow to change the order of the sort_by by any valid given column", async () => {
    const { body } = await request(app)
      .get("/api/reviews?order=asc")
      .expect(200);
    expect(body.reviews).toBeSortedBy("created_at");
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
  test("status 200 - should accept a limit query which limit the number of responses", async () => {
    const { body } = await request(app).get("/api/reviews?limit=3").expect(200);
    expect(body.reviews).toHaveLength(3);
  });
  test("status 400 - should reject if NaN is given to limit", async () => {
    const { body } = await request(app)
      .get("/api/reviews?limit=NaN")
      .expect(400);
    expect(body.msg).toBe("Invalid limit query");
  });
  test("status 200 - should accept a pagination as an offset calculated based on the limit", async () => {
    const { body } = await request(app).get("/api/reviews?p=1").expect(200);
    expect(body.reviews).toHaveLength(3);
  });
  test("status 200 - return object should have a total_count property which count the total element in the reviews table", async () => {
    const { body } = await request(app).get("/api/reviews?p=1").expect(200);
    expect(body.total_count).toBe(13);
  });
  test("status 200 - return object should have a total_count property which count the total element returning from the query", async () => {
    const { body } = await request(app).get("/api/reviews?p=1").expect(200);
    expect(body.current_count).toBe(3);
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
      .get("/api/reviews/NaN/comments")
      .expect(400);
    expect(body.msg).toBe("Invalid data");
  });
  test("status 200 - should accept a limit query which limit the number of comments", async () => {
    const { body } = await request(app)
      .get("/api/reviews/3/comments?limit=1")
      .expect(200);
    expect(body.comments).toHaveLength(1);
  });
  test("status 200 - should respond with an empty object if the review id is valid but there is comments", async () => {
    const { body } = await request(app)
      .get("/api/reviews/1000/comments")
      .expect(200);
    expect(body.comments).toHaveLength(0);
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
    expect(body.comment.author).toBe("bainesface");
    expect(body.comment.body).toBe("Yes! Amazing :)");
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
    expect(body.users).toHaveLength(4);
    body.users.forEach((user) => {
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
    expect(body.user).toEqual(
      expect.objectContaining({
        username: "bainesface",
        avatar_url:
          "https://avatars2.githubusercontent.com/u/24394918?s=400&v=4",
        name: "sarah",
      })
    );
  });
});

describe("PATCH /api/comments/:comment_id", () => {
  test("status 200 - should update the votes of the id specified comments by the provided amount", async () => {
    const patch = { inc_votes: 10 };
    const { body } = await request(app)
      .patch("/api/comments/1")
      .send(patch)
      .expect(200);
    expect(body.comment).toEqual(
      expect.objectContaining({
        comment_id: 1,
        author: "bainesface",
        votes: 26,
        created_at: "2017-11-22T12:43:33.389Z",
        body: "I loved this game too!",
      })
    );
  });
  test("status 200 - should accept to patch and change the review body", async () => {
    const patch = {
      inc_votes: 1,
      body: "This is the new comment body!",
    };
    const { body } = await request(app)
      .patch("/api/comments/1")
      .send(patch)
      .expect(200);
    expect(body.comment).toEqual(
      expect.objectContaining({
        comment_id: 1,
        author: "bainesface",
        votes: 17,
        created_at: "2017-11-22T12:43:33.389Z",
        body: "This is the new comment body!",
      })
    );
  });
  test("status 400 - should return 400 Bad request for a malformed body (missing inc_votes or body)", async () => {
    const { body } = await request(app)
      .patch("/api/comments/1")
      .send({})
      .expect(400);
    expect(body.msg).toBe("Malformed body");
  });
});

describe("POST /api/reviews", () => {
  test("status 201 - should add a new review and return it", async () => {
    const newReview = {
      owner: "bainesface",
      title: "Exciting game",
      review_body: "This is a great review",
      designer: "Probably a cute dog",
      category: "euro game",
    };
    const { body } = await request(app)
      .post("/api/reviews")
      .send(newReview)
      .expect(201);
    expect(body.review).toEqual(
      expect.objectContaining({
        owner: "bainesface",
        title: "Exciting game",
        review_body: "This is a great review",
        designer: "Probably a cute dog",
        category: "euro game",
        review_id: 14,
        votes: 0,
        comment_count: 0,
      })
    );
  });
  test("status 400 - should return an error if any mandatory key is missing from the body", async () => {
    const { body } = await request(app)
      .post("/api/reviews")
      .send({})
      .expect(400);
    expect(body.msg).toBe("Malformed body");
  });
  test("status 400 - should return an error if all mandatory key are inserted but the data is not valid with the references", async () => {
    const newReview = {
      owner: "notAnOwner",
      title: "Exciting game",
      review_body: "This is a great review",
      designer: "Probably a cute dog",
      category: "notACategory",
    };
    const { body } = await request(app)
      .post("/api/reviews")
      .send(newReview)
      .expect(400);
    expect(body.msg).toBe("Invalid data");
  });
});

describe("POST /api/categories", () => {
  test("status 201 - should add a new categories and return it", async () => {
    const newCategory = { slug: "fps", description: "fps in a table game?!" };
    const { body } = await request(app)
      .post("/api/categories")
      .send(newCategory)
      .expect(201);
    expect(body.category).toEqual(
      expect.objectContaining({
        slug: "fps",
        description: "fps in a table game?!",
      })
    );
  });
  test("status 400 - should return an error if any mandatory key is missing from the body", async () => {
    const { body } = await request(app)
      .post("/api/categories")
      .send({})
      .expect(400);
    expect(body.msg).toBe("Malformed body");
  });
});

describe("DELETE /api/reviews/:review_id", () => {
  test("status 204 - should delete the review given its id", async () => {
    const { body } = await request(app).delete("/api/reviews/5").expect(204);
    expect(body).toEqual({});
  });
  test("status 400 - should return an error if an invalid id is provided", async () => {
    const { body } = await request(app).delete("/api/reviews/NaN").expect(400);
    expect(body.msg).toBe("Invalid data");
  });
  test("status 404 - should return an error if an not existent id is provided", async () => {
    const { body } = await request(app).delete("/api/reviews/1000").expect(404);
    expect(body.msg).toBe("Not existent Id");
  });
});

describe("PATCH /api/users/:username", () => {
  test("status 200 - should accept to patch and change users information", async () => {
    const patch = {
      avatar_url: "This is a new URL",
      name: "This is the new name!",
    };
    const { body } = await request(app)
      .patch("/api/users/bainesface")
      .send(patch)
      .expect(200);
    expect(body.user).toEqual(
      expect.objectContaining({
        username: "bainesface",
        avatar_url: "This is a new URL",
        name: "This is the new name!",
      })
    );
  });
  test("status 400 - should return 400 Bad request for a malformed body (missing avatar_url or name)", async () => {
    const { body } = await request(app)
      .patch("/api/users/bainesface")
      .send({})
      .expect(400);
    expect(body.msg).toBe("Malformed body");
  });
});
