/* -------------------------------------------------------------------------- */
/*                                SERVER SETUP                                */
/* -------------------------------------------------------------------------- */

/* --------------------------- Import Dependencies -------------------------- */

    const express = require("express");
    const logger = require("morgan");
    const mongoose = require("mongoose");
    const routes = require("./controllers");
    const path = require('path');
    const db = require("./models");

/* ---------------------- Define Port For Server Comms ---------------------- */

    const PORT = process.env.PORT || 3000;

/* ------------------------- Define Express Instance ------------------------ */

    const app = express();

/* ---------------------------- Define MiddleWare --------------------------- */

    app.use(logger("dev"));
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(express.static("public"));
    app.use(routes);

/* -------------------- Create Connectoin to Mongo DB Server ------------------- */

    mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true }); 

/* ----------------- Define Base Path and HTML Static Routes ---------------- */

    // Serve index.html for the base path
    app.get("/", (req,res) => res.sendFile(path.join(__dirname, "Public")));

    // Serve the exercise html (with option to create new) if they click New Workout
    app.get("/exercise", (req,res) => res.sendFile(path.join(__dirname, "/Public/html/exercise.html")));

    // Server the stats.html if the dashboard nav is clicked and path becomes /stats
    app.get("/stats", (req,res) => res.sendFile(path.join(__dirname, "/Public/html/stats.html")));

/* ---------- My api Routes until I figure out route mounting issue --------- */

       // Route to get all workout documents (which then returns the last workout to the main view)
       app.get("/api/workouts", (req,res) => {
        db.Workout
        .find()
        .sort({day: 1})
            .then(lastWorkout => {
                res.json(lastWorkout);
            })
            .catch(err => {
                res.json(err)
            })
        })

        // Route to create new Exercise
        app.post("/api/workouts", ({body},res) => {
            db.Workout.create(body)
                .then(newExercise => {
                    console.log(newExercise);
                })
                .catch(err => {
                    res.json(err);
                });
        })
  
 

/* -------------------------- Start Express Server -------------------------- */

    app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
    });