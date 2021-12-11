const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WorkoutSchema = new Schema(
  {
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
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);
WorkoutSchema.virtual("totalDuration").get(function () {
  const duration = this.exercises.reduce((acc, curr) => {
    return acc + curr.duration;
  }, 0);

  console.log(duration);

  return duration;
});

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;
