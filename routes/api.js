//API Routes

const express = require("express");
const router = express.Router();
const db = require("../models");

//get workouts
router.get("/api/workouts", (req, res) => {
  db.Workout.find({}, (error, data) => {
    if (error) {
      res.send(error);
    } else {
      res.json(data);
    }
  });
});

//get workouts range
router.get("/api/workouts/range", (req, res) => {
  db.Workout.find({}, (error, data) => {
    if (error) {
      res.send(error);
    } else {
      res.json(data);
    }
  });
});

//get workout id
router.get("/api/workout/:id", (req, res) => {
  db.Workout.findOne(
    {
      _id: mongojs.ObjectId(req.params.id),
    },
    (error, data) => {
      if (error) {
        res.send(error);
      } else {
        res.send(data);
      }
    }
  );
});

//add new workout
router.post("/api/workouts", (req, res) => {
  const work1 = db.Workout.create({}, (error, data) => {
    if (error) {
      res.send(error);
    } else {
      res.json(data);
    }
  });
});

//add to existing workout
router.put("/api/workouts/:id", (req, res) => {
  console.log("id", req.params.id);
  db.Workout.findByIdAndUpdate(
    req.params.id,
    { $push: { exercises: req.body } },
    { new: true, runValidators: true }
  )
    .then((data) => res.json(data))
    .catch((err) => {
      res.json(err);
    });
});
module.exports = router;
