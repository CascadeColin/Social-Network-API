const router = require("express").Router();

// TODO: write controller functions
const {
  getThoughts,
  getThoughtByID,
  createThought,
  createReaction,
  deleteReaction,
  updateThoughtByID,
  deleteThoughtByID,
} = require("../../controllers/appController");

//TODO:
// GET to get all thoughts
// GET to get a single thought by its _id
// POST to create a new thought (don't forget to push the created thought's _id to the associated user's thoughts array field)
router.route("/").get(getThoughts).post(createThought);

router
  .route("/:thoughtId")
  .get(getThoughtByID)
  .put(updateThoughtByID)
  .delete(deleteThoughtByID);

//TODO:
//POST to create a reaction stored in a single thought's reactions array field
// DELETE to pull and remove a reaction by the reaction's reactionId value
router.route("/:thoughtId/reactions").post(createReaction);

router.route("/:thoughtId/reactions/:reactionId").delete(deleteReaction);

module.exports = router;
