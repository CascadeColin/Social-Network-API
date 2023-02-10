const router = require("express").Router();
// TODO: write controller functions
const {
  getUsers,
  getUserByID,
  createUser,
  updateUserById,
  deleteUserById,
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
router.route("/").get(getUsers).post(createUser);

router.route("/:userId").get(getUserByID).put(updateUserById).delete(deleteUserById);

//TODO:
// POST to add a new friend to a user's friend list
// DELETE to remove a friend from a user's friend list
router
  .route("/:userId/friends/:friendId")
  .post(createUserFriend)
  .delete(deleteUserFriend);

module.exports = router;
