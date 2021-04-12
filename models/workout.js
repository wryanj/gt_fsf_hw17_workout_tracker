/* -------------------------------------------------------------------------- */
/*                             Import Dependencies                            */
/* -------------------------------------------------------------------------- */

    const mongoose = require("mongoose");
    const Schema = mongoose.Schema;

/* -------------------------------------------------------------------------- */
/*                                Define Schema                               */
/* -------------------------------------------------------------------------- */

    // Define the Schema to use when I create my workout model
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

    // Convert Schema into a mongoose Model (arg 1 is name of model arg 2 is what schema you want your model to have)
    const Workout = mongoose.model("Workout", WorkoutSchema);


/* -------------------------------------------------------------------------- */
/*                          Export the created model                          */
/* -------------------------------------------------------------------------- */

    module.exports = Workout;
