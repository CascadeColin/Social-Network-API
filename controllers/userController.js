const { User, Thought } = require("../models");

module.exports = {
  // GET all users
  getUsers(req, res) {},
  // GET a single user by its _id and populated thought and friend data
  getUserByID(req, res) {},
  // POST a new user:
  createUser(req, res) {},
  // PUT to update a user by its _id
  updateUser(req, res) {},
  // DELETE to remove user by its _id
  // BONUS: Remove a user's associated thoughts when deleted.
  deleteUser(req, res) {},
  // POST to add a new friend to a user's friend list
  createUserFriend(req, res) {},
  // DELETE to remove a friend from a user's friend list
  deleteUserFriend(req, res) {},
};
