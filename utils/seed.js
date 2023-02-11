// mongoose connection and database name
const { connection, db } = require("../config/connection");
const { User, Thought } = require("../models");
// TODO: import helper functions
const { createRandomUser, createRandomArray, getRandomArrItem } = require("./data");
const thoughts = require("./thoughts");
const reactions = require("./reactions");
const { randomCommentCount } = require("./helpers");

connection.on("error", (err) => err);


/* FIXME:
  1) call stack error
  2) users do not have thoughts
  3) reactions do not have _id
  4) thoughts and reactions do not have createdAt
*/
connection.once("open", async () => {
  console.info(`Connected to ${db}`);

  // clear out DB during development
  await User.deleteMany({});
  await Thought.deleteMany({});

  // arrays for seeding models
  const users = [];

  // creates username, email, and saves randomly generated users in users array (number of users defined in while statement)
  let i = 0;
  do {
    i++;
    const userObj = createRandomUser();
    // generate a random number range (default is 2-5), then create an array of that number of thoughts
    users.push({
      username: userObj.username,
      email: userObj.email,
    });
  } while (i < 20);

  // now that users are created, randomly assign friends to each of them
  // FIXME: not working properly
  // users.map((e) => {
  //   // give them each 3 to 6 friends
  //   const friendCount = randomCommentCount(3, 6);
  //   const friends = createRandomArray(users, friendCount);
  //   e.friends = friends;
  //   return e;
  // });
  
  // map reactions so they can be added to thoughts
  const reactionsSeedArr = reactions.map(reaction => {
    const user = getRandomArrItem(users)
    return {
      reactionBody: reaction,
      username: user.username
    }
  })
  
  
  // map thoughts array to prep them for seedings
  const thoughtsSeedArr = thoughts.map(thought => {
    const user = getRandomArrItem(users)
    const numOfReactions = randomCommentCount(2, 5)
    const reactionsArr = createRandomArray(reactionsSeedArr, numOfReactions)
    return {
      thoughtText: thought,
      username: user.username,
      reactions: reactionsArr
    }
  })
  
  console.log(thoughtsSeedArr)

  // seed DB
  await User.collection.insertMany(users);
  // FIXME: pass in data to be seeded for thoughts
  await Thought.collection.insertMany(thoughtsSeedArr);

  // console generated data and kill node
  console.table(users);
  console.table(thoughtsSeedArr);
  console.info(`Seeding of ${db} complete!`);
  process.exit(0);
});
