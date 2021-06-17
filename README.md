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
Following Northcoders instruction to setup the endpoints, I have made those available and live:

- **GET /api/categories:** Get all the available categories
- **GET /api/reviews/:review_id:** Get a specific review by its id
- **GET /api/reviews:** Get all the reviews
- **GET /api/reviews/:review_id/comments:** Get all the comments relative to the specific review id
- **PATCH /api/reviews/:review_id:** Allow to increment the votes of the specific review - _only allows an object { inc_votes : Number }_
- **POST /api/reviews/:review_id/comments:** Allow to post a new comment - _only allows an object including { username: existingUsername, body: String }_

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
    "supertest": "^6.1.3"
  },
  node: "^15.13.0",
  postgres: {
    "psql": "^13.2",
    "server": "^13.3"
  },
  heroku,
```

---

### Setup

You can clone from my [repo](https://github.com/Angaca/be-nc-games.git).

Install all the dependencies:

```http
npm install
```

Seed local database:

```http
npm run setup-dbs && seed
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
