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

/* -------------------------- Sub-Schema For Array -------------------------- */

    // Define Schema
    const Exercises = new Schema (
        {
            type: String,
            name: String,
            duration: Number,
            weight: Number,
            reps: Number,
            sets: Number 
         }
    );

/* ------------------------------- Main Schema ------------------------------ */

    // Define Schema
    const WorkoutSchema = new Schema({
        day: {type: Date, default: Date.now},
        exercises: [Exercises] // This references the sub-schema above
    });

    // Convert Schema into a mongoose Model (arg 1 is name of model arg 2 is what schema you want your model to have)
    const Workout = mongoose.model("Workout", WorkoutSchema);


/* -------------------------------------------------------------------------- */
/*                          Export the created model                          */
/* -------------------------------------------------------------------------- */

    module.exports = Workout;
