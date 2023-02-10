const router = require("express").Router();
// TODO: write controller functions
const {
  getUsers,
  getUserByID,
  createUser,
  updateUser,
  deleteUser,
  createUserFriend,
  deleteUserFriend,
} = require("../../controllers/userController");

//TODO:
// GET all users
// GET a single user by its _id and populated thought and friend data
// POST a new user:
// PUT to update a user by its _id
// DELETE to remove user by its _id
// BONUS: Remove a user's associated thoughts when deleted.
router.route("").get(getUsers).get(getUserByID).post(createUser).put(updateUser).delete(deleteUser);

//TODO:
// POST to add a new friend to a user's friend list
// DELETE to remove a friend from a user's friend list
router.route("").post(createUserFriend).delete(deleteUserFriend);
