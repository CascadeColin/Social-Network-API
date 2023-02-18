const { User, Thought } = require("../models");

module.exports = {
  // GET to get all thoughts
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.status(200).json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // GET to get a single thought by its _id
  async getThoughtByID(req, res) {
    try {
      const thoughts = await Thought.find({
        _id: req.params.thoughtId,
      });
      res.status(200).json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // POST to create a new thought (don't forget to push the created thought's _id to the associated user's thoughts array field)
  async createThought(req, res) {
    // NOTE: don't forget to push the created thought's _id to the associated user's thoughts array field
  },
  async updateThoughtByID(req, res) {},
  async deleteThoughtByID(req, res) {},
  //POST to create a reaction stored in a single thought's reactions array field
  async createReaction(req, res) {},
  // DELETE to pull and remove a reaction by the reaction's reactionId value
  async deleteReaction(req, res) {},
};
