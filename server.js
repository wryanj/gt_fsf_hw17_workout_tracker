/* -------------------------------------------------------------------------- */
/*                                SERVER SETUP                                */
/* -------------------------------------------------------------------------- */

/* --------------------------- Import Dependencies -------------------------- */

    const express = require("express");
    const logger = require("morgan");
    const mongoose = require("mongoose");
    const routes = require("./controllers");

/* ---------------------- Define Port For Server Comms ---------------------- */

    const PORT = process.env.PORT || 3000;

/* ------------------------- Define Express Instance ------------------------ */

    const app = express();

/* ---------------------------- Define MiddleWare --------------------------- */

    app.use(logger("dev"));
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(express.static("public"));
    app.use(routes);

/* -------------------- Create Connectoin to Mongo DB Server ------------------- */

    mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true }); 

/* -------------------------- Start Express Server -------------------------- */

    app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
    });