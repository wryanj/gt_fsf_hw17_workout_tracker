/* -------------------------------------------------------------------------- */
/*                                SERVER SETUP                                */
/* -------------------------------------------------------------------------- */

    // Import Dependencies
    const express = require("express");
    const logger = require("morgan");
    const mongoose = require("mongoose");
    const path = require('path');
    const db = require("./models");
    const dayjs = require("dayjs");
        const range = dayjs().subtract(7,'day').format('YYYY-MM-DDTHH:mm:ss')
        console.log('dayjs calc test, range is = ' + range);
        console.log('other date test js' + new Date().setDate(new Date().getDate()-6));
  
    
    // Specify Port
    const PORT = process.env.PORT || 3000;

    // Define Express Instance
    const app = express();

    // Define Middleware
    app.use(logger("dev"));
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
   
    // Setup the Express app to handle static files (ensures my html can get the client logic and CSS to use within my public folder)
    let public = path.join(__dirname, "public");
    app.use(express.static(public));

    // Create connection to db server
    mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout",
        {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useCreateIndex: true,
          useFindAndModify: false
        }
    );
      

/* -------------------------------------------------------------------------- */
/*                                   Routes                                   */
/* -------------------------------------------------------------------------- */

/* ------------------------------- HTML Routes ------------------------------ */

    // Serve index.html for the base path
    app.get("/", (req,res) => res.sendFile(path.join(__dirname, "public")));

    // Serve the exercise html (with option to create new) if they click New Workout
    app.get("/exercise", (req,res) => res.sendFile(path.join(__dirname, "/public/html/exercise.html")));

    // Server the stats.html if the dashboard nav is clicked and path becomes /stats
    app.get("/stats", (req,res) => res.sendFile(path.join(__dirname, "/public/html/stats.html")));

/* ------------------------------ Mongo Routes ------------------------------ */

       // Route to get all workout documents (which then returns the last workout to the main view)
       app.get("/api/workouts", (req,res) => {
            db.Workout.find({})
                .then(workouts => {
                    res.json(workouts);
                })
                .catch(err => {
                    res.json(err)
                })
        });

        // Route to get all workout documents within last 7 days (within range)
       app.get("/api/workouts/range", (req,res) => {
            db.Workout.find({
                day: {
                    $gte: new Date().setDate(new Date().getDate()-6)
                }
            })
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
            console.log('CREATE NEW EXERCISE API ROUTE CALLED');
            console.log ("req body is" + JSON.stringify(req.body));
            console.log("req.params.id is" + req.params.id);

            db.Workout.findOneAndUpdate(
                // This is the query to find the id of the workout document that matches the one in req.params
                {
                    _id: req.params.id
                },
                // This is the command to push req.body object into the exercises array (which is an array of exercise subdocuments)
                {
                   $addToSet: {exercises: req.body}
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