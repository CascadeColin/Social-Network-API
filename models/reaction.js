const { Schema, Types, model } = require("mongoose");
const moment = require('moment');

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
    // TEST: set to current timestamp
    default: moment().format('MMMM Do YYYY, h:mm:ss a'),
    // TODO: getter method to format the timestamp on query
  },
});

module.exports = reactionSchema;
