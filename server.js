/* -------------------------------------------------------------------------- */
/*                                SERVER SETUP                                */
/* -------------------------------------------------------------------------- */

/* --------------------------- Import Dependencies -------------------------- */

    const express = require("express");
    const logger = require("morgan");
    const mongoose = require("mongoose");
    //const User = require("./userModel.js"); NEED TO SEE WHAT THIS IS ACTIVITY 13

/* ---------------------- Define Port For Server Comms ---------------------- */

    const PORT = process.env.PORT || 3000;

/* ------------------------- Define Express Instance ------------------------ */

    const app = express();

/* ---------------------------- Define MiddleWare --------------------------- */

    app.use(logger("dev"));
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(express.static("public"));

/* -------------------- Create Connectoin to Mongo Server ------------------- */

    mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true }); // SEE WHAT THIS DOES

/* -------------------------- Start Express Server -------------------------- */

    app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
    });