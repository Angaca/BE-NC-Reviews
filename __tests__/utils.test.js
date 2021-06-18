const seed = require("../db/seeds/seed");
const {
  formatCategories,
  formatUsers,
  formatReviews,
  formatComments,
} = require("../db/utils/data-manipulation");
const testData = require("../db/data/test-data");

describe("formatCategories()", () => {
  it("should return an array of categories values", () => {
    const input = [
      {
        slug: "euro game",
        description: "Abstact games that involve little luck",
      },
    ];
    expect(formatCategories(input)).toEqual([
      ["euro game", "Abstact games that involve little luck"],
    ]);
  });
  it("should not mutate the original input", () => {
    const input = [
      {
        slug: "euro game",
        description: "Abstact games that involve little luck",
      },
    ];
    formatCategories(input);
    expect(input).toEqual([
      {
        slug: "euro game",
        description: "Abstact games that involve little luck",
      },
    ]);
  });
});

describe("formatUsers()", () => {
  it("should return an array of users values", () => {
    const input = [
      {
        username: "mallionaire",
        name: "haz",
        avatar_url:
          "https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg",
      },
      {
        username: "philippaclaire9",
        name: "philippa",
        avatar_url:
          "https://avatars2.githubusercontent.com/u/24604688?s=460&v=4",
      },
    ];
    expect(formatUsers(input)).toEqual([
      [
        "mallionaire",
        "https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg",
        "haz",
      ],
      [
        "philippaclaire9",
        "https://avatars2.githubusercontent.com/u/24604688?s=460&v=4",
        "philippa",
      ],
    ]);
  });
  it("should not mutate the original input", () => {
    const input = [
      {
        username: "mallionaire",
        name: "haz",
        avatar_url:
          "https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg",
      },
      {
        username: "philippaclaire9",
        name: "philippa",
        avatar_url:
          "https://avatars2.githubusercontent.com/u/24604688?s=460&v=4",
      },
    ];
    formatUsers(input);
    expect(input).toEqual([
      {
        username: "mallionaire",
        name: "haz",
        avatar_url:
          "https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg",
      },
      {
        username: "philippaclaire9",
        name: "philippa",
        avatar_url:
          "https://avatars2.githubusercontent.com/u/24604688?s=460&v=4",
      },
    ]);
  });
});

describe("formatReviews()", () => {
  test("Should return an array of reviews data", () => {
    const input = [
      {
        title: "Agricola",
        designer: "Uwe Rosenberg",
        owner: "mallionaire",
        review_body: "Farmyard fun!",
        category: "euro game",
        created_at: 1610964020514,
        votes: 1,
        review_img_url:
          "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
      },
    ];
    expect(formatReviews(input)).toEqual([
      [
        "Agricola",
        "Farmyard fun!",
        "Uwe Rosenberg",
        "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
        1,
        "euro game",
        "mallionaire",
        1610964020514,
      ],
    ]);
  });
});

describe("formatComments", () => {
  test("Should return an array of values", () => {
    const input = [
      {
        title: "Agricola",
        designer: "Uwe Rosenberg",
        owner: "mallionaire",
        review_body: "Farmyard fun!",
        category: "euro game",
        created_at: new Date(1610964020514),
        votes: 1,
        review_img_url:
          "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
      },
    ];
    const reviewRefs = formatReviews(testData.reviewData);
    expect(Array.isArray(formatComments(input, reviewRefs))).toBe(true);
  });
});
