/* -------------------------------------------------------------------------- */
/*                    Define Single API Object With Methods                   */
/* -------------------------------------------------------------------------- */

  const API = {
    
  /* ---------------------------- Get last workout ---------------------------- */

    async getLastWorkout() {
      console.log('getLastWorkout invoked from api.js');

      // declare a local variable res, with no value yet
      let res;

      // Set response equal to returned value in getLastWorkout
      try {
        res = await fetch("/api/workouts");
      } catch (err) {
        console.log(err)
      }

      // Set the json varaiable equal to the list of reuturned workouks
      const json = await res.json();
      console.log(json);

      // return the item that is that list lenght -1 (which is the last recorded workout on the list, last workout)
      return json[json.length - 1];
    },

  /* -----------------------------  Add exercise ------------------------------ */

    async addExercise(data) {
      console.log('addExercise function invoked from api.js')

      // Get the id from the current workout (listed in the URI)
      const id = location.search.split("=")[1];

      // Define a response that will make a put request for that given workout
      const res = await fetch("/api/workouts/" + id, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        // Pass in the added exercise (data) to update the object in mongo db
        body: JSON.stringify(data)
      });

      // get the response json, which should be the updated workout with new exercise added
      const json = await res.json();

      // Return that updated workout as a json object
      return json;
    },

  /* ----------------------------- Create Workout ----------------------------- */

    async createWorkout(data = {}) {
      // post the submitted data
      const res = await fetch("/api/workouts", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" }
      });

      // Get the new workout as a json object response
      const json = await res.json();

      // Return the new workout object
      return json;
    },

  /* -------------------------- Get Workouts In Range ------------------------- */

    async getWorkoutsInRange() {
      const res = await fetch(`/api/workouts/range`);
      const json = await res.json();

      return json;
    },
  };
