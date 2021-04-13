/* -------------------------------------------------------------------------- */
/*                              Starting Function                             */
/* -------------------------------------------------------------------------- */
  /*
    This is run as soon as the page is loaded. I waits the api call for last 
    workout and it displays the last workout if there was one, otherwise it just 
    takes you to the main page. 
  */

/* ----------------------- Initialization on Pageload ----------------------- */

  // Invokes function declared below
  init();

  // Declare async init function
  async function init() {

  console.log('init function invoked from index.js');
    console.log(location.search.split("=")[1]);

    // If the path has no last workout id in it...
    if (location.search.split("=")[1] === undefined) {

      // Define a workout constant that is equal to the get last workout function result
      const workout = await API.getLastWorkout();

      // If there is a workout add some extension to the /exercise path that is equal to ?id=idoflastworkout
      if (workout) {
        location.search = "?id=" + workout._id;
      } 
      // Otherwise hide the continue workout button
      else {
        document.querySelector("#continue-btn").classList.add("d-none")
      }
    }
  }

