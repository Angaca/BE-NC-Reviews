const app = require("./app");

const { PORT = 3737 } = process.env;
app.listen(PORT, () => console.log(`Listening on ${PORT}...`));
