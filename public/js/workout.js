/* -------------------------------------------------------------------------- */
/*                  Workout Client Script Used On Index HTML                  */
/* -------------------------------------------------------------------------- */

/* -------------------------- init Workout Function ------------------------- */
  /*
    This gets the last workout, populates it to the last workout text
    and also sets attributes based on last workout id
  */

  async function initWorkout() {

    // This gets the last recorded workout from a list of returned workouts
    const lastWorkout = await API.getLastWorkout();
      console.log("initWorkout invoked from workout.js Last workout detected as:", lastWorkout);
    
    // If there is a last workout...
    if (lastWorkout) {

      // Set the href link of the continue workout button (blue button) to /exercise?id=id of last workout...
      document
        .querySelector("a[href='/exercise?']")
        .setAttribute("href", `/exercise?id=${lastWorkout._id}`);
      
      // Set workout summary to equal an object with properties retrieved from the lastworkout returned object....
      const workoutSummary = {
        date: formatDate(lastWorkout.day),
        totalDuration: lastWorkout.totalDuration, // THIS NOT WORKING
        numExercises: lastWorkout.exercises.length, // THIS NOT WORKING
        // Using spread operator with tally exercises function to get accumulated totals from all exercises present in the workout
        ...tallyExercises(lastWorkout.exercises)
      };
      //Then render the workout summary in the main window
      renderWorkoutSummary(workoutSummary);
    } else {
      renderNoWorkoutText()
    }
  };

/* ----------------------------- exercise tally ----------------------------- */

 /*
    This adds up all exercise values to total values for the workout
  */

  // Takes in all exercises from the last workout as invoked in initWorkout
  function tallyExercises(exercises) {
    console.log('tally exercise function invoked on workout.js')
    // Uses reduce method on exercises. Acc is accumlated value, curr is current exercise values
    const tallied = exercises.reduce((acc, curr) => {
      // If exercise type is resistence...
      if (curr.type === "resistance") {
        // set the total weight accumulated so far to the last amount plus this amount (if no last amount, add to 0)
        acc.totalWeight = (acc.totalWeight || 0) + curr.weight;
        acc.totalSets = (acc.totalSets || 0) + curr.sets;
        acc.totalReps = (acc.totalReps || 0) + curr.reps;
      } 
      // Else if its cardio, just do that with total distance
      else if (curr.type === "cardio") {
        acc.totalDistance = (acc.totalDistance || 0) + curr.distance;
      }
      // return an object, containing accumlulated values from each exercise as its propoerty
      return acc;
    }, {});
    // return the tallied variable, which will add totalweight, total Sets etc... as properties to workout summary from init workout
    return tallied;
  };

/* -------------------------- format date function -------------------------- */

  /*
    This formats the date into M/D/YYY format
  */

  function formatDate(date) {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    };

    return new Date(date).toLocaleDateString(options);
  }

/* --------------------- render workout function summary -------------------- */

   /*
    This displays the workout totals under "last workout" within the div above
    the buttons on the main index html (which is referred to as workout)
  */

  // The argument here is the workout summary generated in page top initWorkout
  function renderWorkoutSummary(summary) {
    console.log('render workout summary invoked from workout.js');

    // Gets the container to display the values in
    const container = document.querySelector(".workout-stats");

    // Defines an object that sets propoerties and definitoins for what they should hold
    const workoutKeyMap = {
      date: "Date",
      totalDuration: "Total Workout Duration",
      numExercises: "Exercises Performed",
      totalWeight: "Total Weight Lifted",
      totalSets: "Total Sets Performed",
      totalReps: "Total Reps Performed",
      totalDistance: "Total Distance Covered"
    };

    // for each key in the workout summary....
    Object.keys(summary).forEach(key => {
      // Create a p elemenet
      const p = document.createElement("p");
      // Create a strong element (just indicating contents of the element are important)
      const strong = document.createElement("strong");
      // Set the text content of strong element to equal the object keyname (e.x date, totalDuration...)
      strong.textContent = workoutKeyMap[key];
      // create text from teh workout summary next to the bolded key value...
      const textNode = document.createTextNode(`: ${summary[key]}`);
      // append elements to the p element
      p.appendChild(strong);
      p.appendChild(textNode);
      // append the resulting key / value display to the container element
      container.appendChild(p);
    });
  }


/* ---------------------- function if no workout exists --------------------- */

  /*
    This just sets the text You have not created a workout yet into the main 
    div if it detects no workouts have been created
  */

  function renderNoWorkoutText() {
    const container = document.querySelector(".workout-stats");
    const p = document.createElement("p");
    const strong = document.createElement("strong");
    strong.textContent = "You have not created a workout yet!"

    p.appendChild(strong);
    container.appendChild(p);
  }

/* ------------------- Function invokation to start Script ------------------ */

  initWorkout();
