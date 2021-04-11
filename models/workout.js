/* -------------------------------------------------------------------------- */
/*                             Import Dependencies                            */
/* -------------------------------------------------------------------------- */

    const mongoose = require("mongoose");
    const Schema = mongoose.Schema;

/* -------------------------------------------------------------------------- */
/*                                Define Schema                               */
/* -------------------------------------------------------------------------- */

    // Define the Schema
    const WorkoutSchema = new Schema({
        day: Date,
        exercises: [
            {
               type: String,
               name: String,
               duration: Number,
               weight: Number,
               reps: Number,
               sets: Number 
            }
        ]
    });

    // Convert Schema into a mongoose Model
    const Workout = mongoose.model("Workout", WorkoutSchema);


/* -------------------------------------------------------------------------- */
/*                          Export the created model                          */
/* -------------------------------------------------------------------------- */

    module.exports = Workout;
