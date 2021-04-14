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

/* -------------------------------------------------------------------------- */
/*                               Database Routes                              */
/* -------------------------------------------------------------------------- */

       // Route to get all workout documents (which then returns the last workout to the main view)
       app.get("/api/workouts", (req,res) => {

            // Add a field that is total duration for all exercises -- ? Where to I put this in the sequence of the query?
            // db.Workout.aggregate ([
            //     {
            //          set: {
            //              addFields: {totalDuration: {sum:"$exercises.duration"}}
            //         }
            //     }
            // ])
             
                
            db.Workout.find({})
                .then(workouts => {
                    res.json(workouts);
                })
                .catch(err => {
                    res.json(err)
                })
        });
       
       

        // Route to create a new workout
        app.post("/api/workouts", ({body},res) => {
            db.Workout.create(body)
                .then(newWorkout => {
                    console.log(newWorkout);
                    res.json(newWorkout);
                })
                .catch(err => {
                    res.json(err);
                });
        })

        // Route to create new Exercise
        app.put("/api/workouts/:id", (req,res) => {
            console.log ("req body is" + JSON.stringify(req.body));
            console.log("req.params.id is" + req.params.id);

            db.Workout.findOneAndUpdate(
                // This is the query to find the id that matches the one in req.params
                {
                    _id: req.params.id
                },
                // This is the command to push req.body object into the exercises array
                {
                   $push: {exercises: req.body}
                },
                // this specifies its a new item being pushed into the array
                {
                    new:true
                },
                // Specifies specifically for this operation what to do in case of an error
                (err,doc) => {
                    
                    if(err) {
                        console.log('there was an error with your findOneAndUpdate query');
                    }
                    console.log('doc is' + doc);
                }
            )
            .then (updatedWorkout => {
                res.json(updatedWorkout);
            })
            .catch(err => {
                res.json(err);
            });   
        });
  
 

/* -------------------------------------------------------------------------- */
/*                               Server Startup                               */
/* -------------------------------------------------------------------------- */

    app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
    });