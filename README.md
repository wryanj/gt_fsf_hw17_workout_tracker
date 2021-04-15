# gt_fsf_hw17_workout_tracker

## Table of Contents
1. [Description](#Description)
3. [Usage](#Usage)
4. [Installation](#Installation)
5. [Licenses](#Licenses)
6. [Questions](#Questions)
7. [Credits](#Credits)

## Description
**Deployed App (Heroku)**      
https://blooming-stream-98465.herokuapp.com/stats

**Demo Video**       
Demo video below is guided walkthorough of application.  
https://user-images.githubusercontent.com/72420733/114797464-387c7080-9d61-11eb-8942-fde133bc9ea7.mp4

This project was our first time working with a No SQL database. We utilized Mongo DB and mongoose to establish a db and create some routes allowing for users to log and track workout data. I utilized the mongoose docs to establish two schemas for my db- one of which was then used as a subdocument in my main schema. I also decomposed the client code we were provided with just for additional learning, and so that I could understand how to best setup the backend based on the client code we had already been provided. After review, I did decided to modify some code on the client end to achieve the calculation of total duration, as opposed to aggregating into a total duration field within each exercise. However this was a very small change. I did this ensure consistency with how other totals were calculated (the calculations were all done within client script), and to keep my database queries as simple as possible. 

I omitted setting up all my routes in a controllers directory just on account of the fact I only had four pretty simple databse routes so I kept them within a section defined in my server.js file. 

## Usage
This application can be used to log and track workouts and various exercises. 

## Installation
To install this application you just need to ensure that you have nodeJS and run the npm i command to get required dependencies. The package.json list which ones were utilized.

## Licenses
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)  
https://opensource.org/licenses/MIT

## Questions
Email me at ryanjohnson9685@gmail.com for more information.

## Credits
For this assignment I utilized class notes and recordings, as well as some MDM and W3 schools. I also reviewed the docs for sequelize, handlebarsjs and reviewed some stack for questions I came across along the way.
