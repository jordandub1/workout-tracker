const express = require("express");
const router = express.Router();
const db = require("../models");

// get last workout
router.get("/api/workouts", (req, res) => {
  db.Workout.find({})
    .sort({ _id: -1 })
    .limit(1)
    .then((dbWorkout) => {
      dbWorkout.forEach((workout) => {
        let total = 0;
        workout.exercises.forEach((exercise) => {
          total += exercise.duration;
        });
        workout.totalDuration = total;
      });
      console.log(dbWorkout[0].exercises);
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.json(err);
    });
});

// add exercise
router.put("/api/workouts/:id", ({ body, params }, res) => {
  db.Workout.findOneAndUpdate(
    { _id: params.id },
    {
      $push: { exercises: body },
      $inc: { totalDuration: body.duration },
    },
    { new: true }
  ).then((dbWorkout) => {
    console.log(dbWorkout);
    res.json(dbWorkout);
  });
  console.log("add exercise complete").catch((err) => {
    res.json(err);
  });
});

// create workout
router.post("/api/workouts", ({ body }, res) => {
  db.Workout.create({}).then((dbWorkouts) => {
    res.json(dbWorkouts);
  });
  console.log("create workout complete").catch((err) => {
    res.json(err);
  });
});

// get workouts in range
router.get("/api/workouts/range", (req, res) => {
  db.Workout.find({})
    .limit(7)
    .then((dbWorkouts) => {
      console.log(dbWorkouts);
      res.json(dbWorkouts);
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = router;
