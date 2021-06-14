const seed = require("../db/seeds/seed");
const {
  categoriesValues,
  usersValues,
} = require("../db/utils/data-manipulation");
const testData = require("../db/data/test-data");

describe("categoriesValues()", () => {
  it("should return an array of categories values", () => {
    const input = [
      {
        slug: "euro game",
        description: "Abstact games that involve little luck",
      },
    ];
    expect(categoriesValues(input)).toEqual([
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
    categoriesValues(input);
    expect(input).toEqual([
      {
        slug: "euro game",
        description: "Abstact games that involve little luck",
      },
    ]);
  });
});

describe("usersValues()", () => {
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
    expect(usersValues(input)).toEqual([
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
    usersValues(input);
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
