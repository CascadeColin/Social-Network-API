const { firstnames, lastnames } = require("./names");
const reactions = require("./reactions");
const thoughts = require("./thoughts");

const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

// creates a randomly generated user and returns an object that can be used with mongo
const createRandomUser = () => {
  const first = getRandomArrItem(firstnames);
  const last = getRandomArrItem(lastnames);
  const username = `${first}_${last}`;
  const email = `${first}_${last}@email.com`;
  return {
    username,
    email,
  };
};

/* 
PARAMETERS: 
STRING: takes in "thoughts", "users", or "reactions" and creates an array of the specified option 
NUMBER: represents the number of array indexes to create
*/
const createRandomArray = (arr, num) => {
  const array = [];
  if (Array.isArray(arr)) {
    let i = 0;
    do {
      i++;
      const index = getRandomArrItem(arr);
      array.push(index);
    } while (i !== num);
    return array;
  } else {
    console.error(
      "\nFirst parameter is either not a String, or String parameter does not match a known model.\nLocations: createRandomRange() in utils/data.js\n"
    );
    return [];
  }
};

module.exports = {
  createRandomUser,
  createRandomArray,
  getRandomArrItem,
};
