# Angaca Northcoders House Of Games API

This is my first solo project, I have designed an API that allows the user to get few piece of data relative to table games; specifically reviews and comments about those games.

[Hosted version](https://nc-games-angaca.herokuapp.com/)

---

## Table of Contents

- _General info_
- _Technologies_
- _Setup_

---

### General info

This API will allow the user to access data of reviews about table games.
I have used Github Actions for Continuous Integration, Delivery and Deployment.
I have create the seeding from some js files to a db and setup the endpoints, I have made those available and live:

- **GET /api/categories:** Get all the available categories.
- **GET /api/reviews/:review_id:** Get a specific review by its id.
- **GET /api/reviews:** Get all the reviews - _allows to sort by ?sort_by=validColumns > default to created_at, ?order=asc/desc > default to desc; ?limit=positiveNumber > default to 10 results, decide pagination ?p=positiveNumber > default to 0 and filter by ?category=existingCategory_.
- **GET /api/reviews/:review_id/comments:** Get all the comments relative to the specific review id - _allows to limit results via query ?limit=positiveNumber > default to 10 results, decide pagination ?p=positiveNumber > default to 0_.
- **GET /api/users:** Get all the users.
- **GET /api/users/:username:** Get the specific user by its username.
- **PATCH /api/reviews/:review_id:** Allows to increment the votes of the specific review - _only accepts an object format like >> { inc_votes : Number }_.
- **PATCH /api/comments/:comment_id:** Allows to increment the votes of the specific comment - _only accepts an object format like >> { inc_votes : Number }_.
- **POST /api/category:** Allows to post a new category - _only accepts an object format like >> { slug: String, description: String }_.
- **POST /api/reviews:** Allows to post a new comment - _only accepts an object format like >> { owner: existingUsername, title: String, review_body: String, designer: String, category: existingCategory }_.
- **POST /api/reviews/:review_id/comments:** Allows to post a new comment - _only accepts an object format like >> { username: existingUsername, body: String }_.
- **DELETE /api/comments/:comment_id:** It will delete the comment of the given id.
- **DELETE /api/reviews/:review_id:** It will delete the review of the given id.

---

### Technologies

```json
  dependencies: {
    "dotenv": "^10.0.0",
    "express": "^4.17.1",
    "pg": "^8.6.0",
    "pg-format": "^1.0.4"
  },
  devDependencies: {
    "jest": "^27.0.4",
    "supertest": "^6.1.3",
    "jest-sorted": "^1.0.12"
  },
```

You will need to install Node and Postgres.
I have hosted the API with Heroku.

---

### Setup

You can clone from my [repo](https://github.com/Angaca/be-nc-games.git).

Install all the dependencies:

```http
npm install
```

Seed local database:

```http
npm run setup-dbs && npm run seed
```

Testing locally with Jest:

```http
npm test app
```

In order to test using the provided test_db two .env files needs setup:

- .env.development > PGDATABASE=nc_games
- .env.test > PGDATABASE=nc_games_test

The test database will run and seed before each test, to test locally with localhost and the development db:

```http
npm run start
```

The server will start listen in the default port 3737. I suggest using Nodemon to restart the server after each saving if testing in local.

Thanks!
