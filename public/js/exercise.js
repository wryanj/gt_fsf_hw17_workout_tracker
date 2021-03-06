/* -------------------------------------------------------------------------- */
/*                    Client Script For Exercise HTML Page                    */
/* -------------------------------------------------------------------------- */

  /*
    Script used on exercise html page
  */

/* ------------------------- Define global variables ------------------------ */

  // Representing elemenets on the page..
  const workoutTypeSelect = document.querySelector("#type");
  const cardioForm = document.querySelector(".cardio-form");
  const resistanceForm = document.querySelector(".resistance-form");
  const cardioNameInput = document.querySelector("#cardio-name");
  const nameInput = document.querySelector("#name");
  const weightInput = document.querySelector("#weight");
  const setsInput = document.querySelector("#sets");
  const repsInput = document.querySelector("#reps");
  const durationInput = document.querySelector("#duration");
  const resistanceDurationInput = document.querySelector("#resistance-duration");
  const distanceInput = document.querySelector("#distance");
  const completeButton = document.querySelector("button.complete");
  const addButton = document.querySelector("button.add-another");
  const toast = document.querySelector("#toast");
  const newWorkout = document.querySelector(".new-workout")


  // Global variables used in different functions
  let workoutType = null;
  let shouldNavigateAway = false;

/* ------------------------- Init Exercise Function ------------------------- */

  /*
    Function called every time the exercise html page is loaded
  */

  // Declare initExercise
  async function initExercise() {

    console.log('init Exercise function invoked from exercise.js');

    let workout;

    // Here we say split the search query at 0 and include only one substring after it. If undefined, workout shoudl be create workout
    if (location.search.split("=")[1] === undefined) {
      console.log('no prior workout detected in init exercise, new workout being created')
      workout = await API.createWorkout();
    }
    // If a workout is created, update the URI location with its new id
    if (workout) {
      location.search = "?id=" + workout._id;
      console.log(workout._id);
    }

  }

  // Invoke Function^
  initExercise();

/* -------------------------- Handle Workout Change ------------------------- */

  /*
    Is just managing what to show based on exercise type dropdown
  */

  function handleWorkoutTypeChange(event) {
    console.log('handle workout type change invoked on exercise.js')

    workoutType = event.target.value;

    if (workoutType === "cardio") {
      cardioForm.classList.remove("d-none");
      resistanceForm.classList.add("d-none");
    } else if (workoutType === "resistance") {
      resistanceForm.classList.remove("d-none");
      cardioForm.classList.add("d-none");
    } else {
      cardioForm.classList.add("d-none");
      resistanceForm.classList.add("d-none");
    }

    validateInputs();
  }

/* ----------------------------- Validate Inputs ---------------------------- */

  /*
    Is checking that the inputs exist based on the workout type, and keeps
    the Complete and Add buttons disabled until values exist for all
    required fields. 
  */

  function validateInputs() {

    let isValid = true;

    if (workoutType === "resistance") {
      if (nameInput.value.trim() === "") {
        isValid = false;
      }

      if (weightInput.value.trim() === "") {
        isValid = false;
      }

      if (setsInput.value.trim() === "") {
        isValid = false;
      }

      if (repsInput.value.trim() === "") {
        isValid = false;
      }

      if (resistanceDurationInput.value.trim() === "") {
        isValid = false;
      }
    } else if (workoutType === "cardio") {
      if (cardioNameInput.value.trim() === "") {
        isValid = false;
      }

      if (durationInput.value.trim() === "") {
        isValid = false;
      }

      if (distanceInput.value.trim() === "") {
        isValid = false;
      }
    }

    if (isValid) {
      completeButton.removeAttribute("disabled");
      addButton.removeAttribute("disabled");
    } else {
      completeButton.setAttribute("disabled", true);
      addButton.setAttribute("disabled", true);
    }
  }

/* ------------------------- Handle Form Sumbmission ------------------------ */
  /*
    This handles the form submission for complete, OR add exercise. Based
    on what was entered, it populates a workoutData object to be provided 
    back to the db consistent with our Mongo one then calls our add exercise function
  */

  async function handleFormSubmit(event) {

    console.log('handle form submit function invoked on exercise.js');

    event.preventDefault();

    let workoutData = {};

    if (workoutType === "cardio") {
      workoutData.type = "cardio";
      workoutData.name = cardioNameInput.value.trim();
      workoutData.distance = Number(distanceInput.value.trim());
      workoutData.duration = Number(durationInput.value.trim());
    } 
    else if (workoutType === "resistance") {
      workoutData.type = "resistance";
      workoutData.name = nameInput.value.trim();
      workoutData.weight = Number(weightInput.value.trim());
      workoutData.sets = Number(setsInput.value.trim());
      workoutData.reps = Number(repsInput.value.trim());
      workoutData.duration = Number(resistanceDurationInput.value.trim());
    }

    
    await API.addExercise(workoutData);
    clearInputs();
    toast.classList.add("success");

  }

function handleToastAnimationEnd() {
  console.log('handleToastAnimation invoked on exercise.js')
  toast.removeAttribute("class");
  if (shouldNavigateAway) {
    location.href = "/";
  }
}

/* -------------------------- Clear inputs function ------------------------- */
/*
  Just clears inputs after form submisstion
*/

  function clearInputs() {
    cardioNameInput.value = "";
    nameInput.value = "";
    setsInput.value = "";
    distanceInput.value = "";
    durationInput.value = "";
    repsInput.value = "";
    resistanceDurationInput.value = "";
    weightInput.value = "";
  }

/* ------------------- Manage event listners and handlers ------------------- */


  // If the exercise type toggler is selected, and select is changed, call that handle change function again
  if (workoutTypeSelect) {
    workoutTypeSelect.addEventListener("change", handleWorkoutTypeChange);
  }

  // If the complete button is clicked, navigate away and handle form submit with that event
  if (completeButton) {
    completeButton.addEventListener("click", function (event) {
      shouldNavigateAway = true;
      handleFormSubmit(event);
    });
  }

  // If the add exercise is clicked, add event listner to it and handle form submit function for click
  if (addButton) {
    addButton.addEventListener("click", handleFormSubmit);
  }

  // Nothing happening here?
  toast.addEventListener("animationend", handleToastAnimationEnd);

  // Select all input elemenets on the form and validate inputs each time there is an input
  document
    .querySelectorAll("input")
    .forEach(element => element.addEventListener("input", validateInputs));
