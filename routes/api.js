const router = require("express").Router();
const Workout = require("../models/workout");

//getLastWorkout function in api.js
router.get("/", ({ body }, res) => {
  Workout.find({})
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

//addExercise function in api.js
router.put("/:id", ({ body, params }, res) => {
  Workout.findOneAndUpdate(
    { _id: params.id },
    {
      $push: { exercises: body },
      $inc: { totalDuration: body.duration },
    },
    { new: true }
  )
    .then((dbWorkout) => {
      console.log(dbWorkout);
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.json(err);
    });
});

//createWorkout function in api.js
router.post("/", ({ body }, res) => {
  console.log("hello");
  Workout.create({})
    .then((dbWorkouts) => {
      res.json(dbWorkouts);
    })
    .catch((err) => {
      res.json(err);
    });
});

//getWorkoutsInRange function on api.js
router.get("/range", (req, res) => {
  Workout.find({})
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
