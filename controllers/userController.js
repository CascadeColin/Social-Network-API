const { User, Thought } = require("../models");

module.exports = {
  // GET all users
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // GET a single user by its _id and populated thought and friend data
  async getUserByID(req, res) {
    try {
      const user = await User.find({
        _id: req.params.userId,
      });
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // POST a new user:
  //TEST:
  async createUser(req, res) {
    try {
      const newUser = User.create(req.body);
      res.status(200).json(newUser);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // PUT to update a user by its _id
  // TEST:
  async updateUserById(req, res) {
    try {
      const updateUser = User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      );
      if (updateUser) {
        res.status(200).json(updateUser);
      } else {
        res.status(404).json({ message: "User not found by that ID!" });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // DELETE to remove user by its _id
  // BONUS: Remove a user's associated thoughts when deleted.
  async deleteUserById(req, res) {
    try {
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // POST to add a new friend to a user's friend list
  async createUserFriend(req, res) {
    try {
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // DELETE to remove a friend from a user's friend list
  async deleteUserFriend(req, res) {
    try {
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
