// mongoose connection and database name
const { connection, db } = require("../config/connection");
const { User, Thought } = require("../models");
// TODO: import helper functions
const { createRandomUser } = require("./data");

connection.on("error", (err) => err);

connection.once("open", async () => {
  console.info(`Connected to ${db}`);

  // clear out DB
  //   await User.deleteMany({});
  //   await Thought.deleteMany({});

  // TODO: functions for data handling

  // create a collection of 20 random users and store in array
  const users = [];
  let i = 0;

  do {
    i++;
    const userObj = createRandomUser();
    users.push({
      username: userObj.username,
      email: userObj.email,
    });
  } while (i < 21);

  const thoughts = [];

  // seed DB
  //   await User.collection.insertMany(users);
  //   await Thought.collection.insertMany(thoughts);

  // console generated data and kill node
  console.table(users);
  console.table(thoughts);
  console.info(`Seeding of ${db} complete!`);
  process.exit(0);
});
