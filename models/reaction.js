const { Schema, Types } = require("mongoose");

// gets the timezone at the location this app is being run
const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

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
});

module.exports = reactionSchema;
