const { MongoClient } = require("mongodb");

class App {
  mongoClient = null;

  constructor(connectionBase) {
    this.connectionBase = connectionBase;
    this.mongoClient = new MongoClient(connectionBase, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }

  static instance(connectionBase) {
    if (!App._instance) {
      App._instance = new App(connectionBase);
    }
    return App._instance;
  }

  async connect() {
    await this.mongoClient.connect();
    console.log("Connected to MongoDB");
    await this.mongoClient.close();
  }

  async query(query) {
    // query is a SELECT email, slug, acquisitionSurvey FROM users.users WHERE email = 'paqueterico12@yopmail.com'

    const [database, collection] = query.match(/FROM (\w+)\.(\w+)/).slice(1);

    console.log(`Database: ${database}`);
    console.log(`Collection: ${collection}`);

    const projection = query.match(/SELECT (.+?) FROM/)[1].split(", ");

    const filter = query.match(/WHERE (\w+) = '(\w+@\w+\.\w+)'/).slice(1);

    await this.mongoClient.connect();

    const result = await this.mongoClient
      .db(database)
      .collection(collection)
      .findOne({ [filter[0]]: filter[1] });

    await this.mongoClient.close();
    return result;
  }
}

module.exports = App;
