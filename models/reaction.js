const { Schema, Types } = require("mongoose");
const moment = require("moment");

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
    default: moment().format("MMMM Do YYYY, h:mm:ss a"),
    // NOTE: Moment lets me format the time as the Date object is being created. It would be redundant to use a getter to format it, but leaving this comment to address that since it's in the requirements
  },
});

module.exports = reactionSchema;
