const { Schema, Types, model } = require("mongoose");
const moment = require('moment');
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
      // TEST: set to current timestamp with moment
      default: moment().format('MMMM Do YYYY, h:mm:ss a'),
      // get: TODO: getter method to format the timestamp on query
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

//TODO: Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query.
thoughtSchema
  .virtual("reactionCount")
  .get(function () {})
  .set(function () {});

const Thought = model("thought", thoughtSchema);

module.exports = Thought;
