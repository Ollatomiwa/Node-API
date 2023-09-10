const express = require ('express');
const fs = require ('fs');
const morgan = require('morgan');

//importing our routes
const tourRouter = require (`./routes/tourRoutes`);
const userRouter = require (`./routes/userRoutes`);

const app = express();

// MIDDLEWARE
app.use(morgan('dev'));
app.use(express.json());

app.use((req, res, next) => {
    console.log("Hello from the MidddleWare");
    next ();
});

app.use ((req, res, next) => {
    req.requestTime = new Date () .toISOString();
    next ();
});

// using app.routes 

        //ROUTES
app.use (`/api/v1/tours`, tourRouter);
app.use (`/api/v1/users`, userRouter);


//exporting our app.js to use in server.js
module.exports = app;