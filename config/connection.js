const { connect, connection } = require("mongoose");

const db = `SocialNetworkDB`;

(async () => {
  try {
    await connect(`mongodb://127.0.0.1:27017/${db}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (err) {
    throw err;
  }
})();

module.exports = {
  db,
  connection
}
