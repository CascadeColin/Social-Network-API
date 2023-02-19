const { User, Thought } = require("../models");
const reactionSchema = require("../models/reaction");
const { shuffle } = require("../utils/helpers");

// generates a random user to attach to thoughts and reactions
const getRandomUser = async () => {
  // get array of all User ids
  const users = await User.find().distinct("username");
  // randomly sort array
  const randomSort = shuffle(users);
  // return index 0 as a randomly generated user
  return randomSort[0];
};

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
      // if array length is falsy value 0
      if (!thoughts.length) {
        res.status(404).json({ message: "Thought not found!" });
      } else {
        res.status(200).json(thoughts);
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // POST to create a new thought (don't forget to push the created thought's _id to the associated user's thoughts array field)
  async createThought(req, res) {
    try {
      req.body.username = await getRandomUser();
      // create new thought
      const newThought = await Thought.create(req.body);
      // push new thought to user document
      await User.findOneAndUpdate(
        { username: req.body.username },
        { $push: { thoughts: newThought } }
      );
      if (newThought) {
        res.status(200).json({ message: "Thought added successfully!" });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async updateThoughtByID(req, res) {
    try {
      const updateThought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );
      if (updateThought) {
        res.status(200).json({ message: "Thought updated successfully!" });
      } else {
        res.status(404).json({ message: "User not found by that ID!" });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async deleteThoughtByID(req, res) {
    try {
      const deletedThought = await Thought.findOneAndRemove({
        _id: req.params.thoughtId,
      });
      if (deletedThought) {
        res.status(200).json({ message: "Thought deleted successfully!" });
      } else {
        res.status(404).json({ message: "User not found by that ID!" });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //POST to create a reaction stored in a single thought's reactions array field
  async createReaction(req, res) {
    try {
      req.body.username = await getRandomUser();

      const updateThought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $push: { reactions: req.body } },
        { runValidators: true, new: true }
      );

      if (Object.keys(updateThought).length > 0) {
        res.status(200).json({ message: "Reaction added successfully!" });
      } else {
        res.status(400).json({ message: "Failed to add reaction to thought" });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // DELETE to pull and remove a reaction by the reaction's reactionId value
  async deleteReaction(req, res) {
    try {
      const updateThought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { _id: req.params.reactionId } } },
        { runValidators: true, new: true }
      );

      if (Object.keys(updateThought).length > 0) {
        res.status(200).json({ message: "Reaction removed successfully!" });
      } else {
        res
          .status(400)
          .json({ message: "Failed to remove reaction from thought" });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
