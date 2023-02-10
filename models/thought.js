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
      default: new Date(),
      get: (epoch) => {
        // gets info on the location this model is run from
        const userLocation = Intl.DateTimeFormat().resolvedOptions();
        const userLocale = userLocation.locale;
        const userTimezone = userLocation.userTimezone;
        // formats tiemstamp to user's language settings and timezone
        // appears in this format: 2/10/2023, 10:22:19 AM
        return epoch.toLocaleString(userLocale, { timeZone: userTimezone });
      },
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
thoughtSchema.virtual("reactionCount").get(function () {
  // returns length of the array to represent total # of reactions
  return this.reactions.length;
});

const Thought = model("thought", thoughtSchema);

module.exports = Thought;
