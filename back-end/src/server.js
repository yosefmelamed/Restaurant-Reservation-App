const PORT = process.env.PORT || "8080";
const app = require("./app");
const knex = require("./db/connection");
const favicon = require("express-favicon");
app.use(favicon(__dirname + "/public/favicon.png"));

knex.migrate
  .latest()
  .then((migrations) => {
    console.log("migrations", migrations);
    app.listen(PORT, listener);
  })
  .catch((error) => {
    console.error(error);
    knex.destroy();
  });

function listener() {
  console.log(`Listening on Port ${PORT}!`);
}
