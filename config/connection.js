const { connect, connection } = require("mongoose");

(async () => {
  try {
    await connect("mongodb://127.0.0.1:27017/SocialNetworkDB", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (err) {
    throw err;
  }
})();

module.exports = connection;
