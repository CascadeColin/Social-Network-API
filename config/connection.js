const { connect, connection } = require("mongoose");
require("dotenv").config();

const db = process.env.DB;

(async () => {
  try {
    await connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (err) {
    throw err;
  }
})();

module.exports = {
  db,
  connection,
};
