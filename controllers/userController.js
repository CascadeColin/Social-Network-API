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
      if (!user.length) {
        res.status(404).json({ message: "User not found!" });
      } else {
        res.status(200).json(user);
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // POST a new user:
  async createUser(req, res) {
    try {
      const newUser = await User.create(req.body);
      if (Object.keys(newUser).length > 0) {
        res.status(200).json({message: "New user created successfully!"});
      } else {
        res.status(400).json({message: "Failed to create new user object"})
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // PUT to update a user by its _id
  async updateUserById(req, res) {
    try {
      const updateUser = await User.findOneAndUpdate(
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
      console.log(err);
      res.status(500).json(err);
    }
  },
  // DELETE to remove user by its _id
  // TODO: Remove a user's associated thoughts when deleted.
  async deleteUserById(req, res) {
    try {
      const deleteUser = await User.findOneAndRemove({
        _id: req.params.userId,
      });
      res.status(200).json({ message: "User successfully deleted!" });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // POST to add a new friend to a user's friend list
  async createUserFriend(req, res) {
    try {
      const user = await User.find({
        _id: req.params.userId,
      });
      const friend = await User.find({
        _id: req.params.friendId,
      });
      // add friend to user's friend list if the params are valid
      if (user && friend) {
        const update = await User.findOneAndUpdate(
          { _id: req.params.userId },
          { $push: { friends: friend } }
        );
        res.status(200).json(update);
      } else {
        res.status(403).json({ message: "Check the user IDs and try again!" });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // DELETE to remove a friend from a user's friend list
  async deleteUserFriend(req, res) {
    try {
      const userObj = await User.find({
        _id: req.params.userId,
      });
      const friendObj = await User.find({
        _id: req.params.friendId,
      });
      // add friend to user's friend list if the params are valid
      if (userObj && friendObj) {
        const update = await User.findOneAndUpdate(
          { _id: req.params.userId },
          { $pull: { friends: req.params.friendId } }
        );
        res.status(200).json(update);
      } else {
        res.status(403).json({ message: "Check the user IDs and try again!" });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
