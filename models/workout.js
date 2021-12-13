const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const workoutSchema = new Schema({
  day: {
    type: Date,
    default: new Date().setDate(new Date().getDate()),
  },
  exercises: [
    {
      type: {
        type: String,
      },

      name: {
        type: String,
      },

      distance: {
        type: Number,
      },

      weight: {
        type: Number,
      },

      sets: {
        type: Number,
      },

      reps: {
        type: Number,
      },

      duration: {
        type: Number,
      },
    },
  ],
  totalDuration: {
    type: Number,
    default: 0,
  },
});

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;
