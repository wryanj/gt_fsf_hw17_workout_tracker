/* -------------------------------------------------------------------------- */
/*                             Import Dependencies                            */
/* -------------------------------------------------------------------------- */

    const router = require('express').Router();
    const workoutRoutes = require('./workoutRoutes');  

/* -------------------------------------------------------------------------- */
/*                       Define Middleware For This Path                      */
/* -------------------------------------------------------------------------- */

    /*
     Routes mounted to /api...
    */

    router.use('/workouts', workoutRoutes); // any path with /api/workouts will use workout routes
    
/* -------------------------------------------------------------------------- */
/*                                Export Module                               */
/* -------------------------------------------------------------------------- */

    module.exports = router;