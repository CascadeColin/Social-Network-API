const { Schema, Types, model } = require("mongoose");
const { validateEmail } = require("../utils/helpers");

const userSchema = new Schema(
  {
    username: { type: String, unique: true, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: validateEmail(),
        message: "Please enter a valid email address",
      },
    },
    // thought.js
    thoughts: [
      {
        type: Types.ObjectId,
        ref: "Thought",
      },
    ],

    // self-referencing friends list
    friends: [
      {
        type: Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);


// TEST: Create a virtual called friendCount that retrieves the length of the user's friends array field on query.
userSchema
  .virtual("friendCount")
  .get(function () {
    // returns length of the array to represent total # of user's friends
    return this.friends.length;
  })

const User = model("user", userSchema);

module.exports = User;
