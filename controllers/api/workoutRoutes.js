/* -------------------------------------------------------------------------- */
/*                             Import Dependencies                            */
/* -------------------------------------------------------------------------- */
    const express = require("express");
    const router = require('express').Router();
    const app = express();
    const db = require("../../models");
  
/* -------------------------------------------------------------------------- */
/*                                Define Routes                               */
/* -------------------------------------------------------------------------- */

    /*
        Routes mounted to /api/workouts (api/workouts is route to this page)
    */

/* ------------------------------- Get Routes ------------------------------- */

    // Route to get last workout
    app.get("/", (req,res) => {
        console.log(`request made to app.get/`);
        db.Workout.find({})
            .then(lastWorkout => {
                res.json(lastWorkout);
            })
            .catch(err => {
                res.json(err)
            })
    } )
  
/* ------------------------------- Put Routes ------------------------------- */

    // Add exercise
    app.post("/", ({body},res) => {
        console.log(req.body);
        db.Workout.create(body)
            .then(newExercise => {
                console.log(newExercise);
            })
            .catch(err => {
                res.json(err);
            });
    })


/* -------------------------------------------------------------------------- */
/*                  Export Router Module for Use in ServerJS                  */
/* -------------------------------------------------------------------------- */

    module.exports = router;