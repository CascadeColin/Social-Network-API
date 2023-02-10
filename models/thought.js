const { Schema, model } = require("mongoose");
const reactionSchema = require("./reaction");

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280,
    },
    createdAt: {
      type: Date,
      // creates a Date object formatted as "February 9th 2023, 2:33:56 pm"
      default: Date.now(),
      // TODO: getter to format the time
    },
    // user that created this thought
    username: {
      type: String,
      required: true,
    },
    // replies to this thought
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

//TEST: Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query.
thoughtSchema
  .virtual("reactionCount")
  .get(function () {
    // returns length of the array to represent total # of reactions
    return this.reactions.length;
  })

const Thought = model("thought", thoughtSchema);

module.exports = Thought;
