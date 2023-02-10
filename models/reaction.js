const { Schema, Types } = require("mongoose");

const reactionSchema = new Schema({
  reactionId: {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId(),
  },
  reactionBody: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 280,
  },
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    // creates a Date object formatted as "February 9th 2023, 2:33:56 pm"
    default: Date.now()
    // TODO: getter to format the time
  },
});

module.exports = reactionSchema;
