const App = require("./lib/app");

async function main() {
  const app = new App("");

  await app.connect();

  const QUERY =
    "SELECT email, slug, acquisitionSurvey FROM users.users WHERE email = 'paqueterico12@yopmail.com'";

  const result = await app.query(QUERY);

  console.log(result);
}

main().catch(console.error);
