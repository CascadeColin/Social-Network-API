const { Schema, model } = require("mongoose");
const moment = require("moment");
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
      default: moment().format("MMMM Do YYYY, h:mm:ss a"),
      // NOTE: Moment lets me format the time as the Date object is being created. It would be redundant to use a getter to format it, but leaving this comment to address that since it's in the requirements.
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
