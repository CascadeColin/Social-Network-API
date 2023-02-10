const { User, Thought } = require("../models");

module.exports = {
  // GET to get all thoughts
  getThoughts(req, res) {},
  // GET to get a single thought by its _id
  getThoughtByID(req, res) {},
  // POST to create a new thought (don't forget to push the created thought's _id to the associated user's thoughts array field)
  createThought(req, res) {
    // NOTE: don't forget to push the created thought's _id to the associated user's thoughts array field
  },
  //POST to create a reaction stored in a single thought's reactions array field
  createReaction(req, res) {},
  // DELETE to pull and remove a reaction by the reaction's reactionId value
  deleteReaction(req, res) {},
};
