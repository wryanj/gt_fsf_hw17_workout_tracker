/* -------------------------------------------------------------------------- */
/*                             Import Dependencies                            */
/* -------------------------------------------------------------------------- */

    const mongoose = require("mongoose");
    const Schema = mongoose.Schema;

/* -------------------------------------------------------------------------- */
/*                                Define Schemas                              */
/* -------------------------------------------------------------------------- */
    /*
        Two schemas are below. One is the main model, the other is a sub-doc
        These are necessary to better work with arrays per mongoose docs
    */

/* ----------------- Subdocument Schema For Exercises Array ----------------- */

    // Define Subdocument Schema
    const ExerciseSchema = new Schema (
        {
            type: String,
            name: String,
            duration: Number,
            distance: Number,
            weight: Number,
            reps: Number,
            sets: Number 
         }
    );

/* ------------------------------- Main Schema ------------------------------ */

    /*
         Note that _id field is included by default within each document
         once it is generated by mongoose into mongo db

         In addition, a _V for version field is added any time a new doc
         is created outside the seeds file. 
    */

    // Define Main Schema
    const WorkoutSchema = new Schema({
        day: {type: Date, default: Date.now},
        exercises: [ExerciseSchema] // This references the subdocument schema above
    });

    // Convert Schema into a mongoose Model (arg 1 is name of model arg 2 is what schema you want your model to have)
    const Workout = mongoose.model("Workout", WorkoutSchema);


/* -------------------------------------------------------------------------- */
/*                          Export the created model                          */
/* -------------------------------------------------------------------------- */

    module.exports = Workout;
