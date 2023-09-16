const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require ('./app'); //importing the app.js to use in the server.js

dotenv.config({path: './config.env'});

const DB = process.env.DATABASE.replace('<password>', process.env.DATABASE_PASSWORD);

// we connected our MongoDB atlas to our express.js
mongoose
    .connect(DB, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    }   ) .then(con => {
        console.log('DB connction succesful');
        console.log(con.connections);
    });

    //creating a simple tour model with mongoose

const tourSchema = new mongoose.Schema({ 
    name: {
        type: String,
        required: [true, 'A tour must have a name'], //THIS REQUIRED IS CALLED A VALIDATION JUST AS UNIQUE
        unique: true //we added this unique validator in order to make sure we dont have the documents with the same name
    },

    rating: {
        type: Number,
        default: 4.5

    },

    price: {
        type: Number,
        required: [true, 'A tour must have a price']
    }

});

const Tour = mongoose.model('Tour', tourSchema); //we used capita Tour so we know we are dealing with a model

//this is a new document we created out of our tourSchema/ tour model
const testTour = new Tour({
    name: 'The Superman',
    price: 467
});

// this will save the document into our tour collections in our database
testTour.save() .then(doc => {
    console.log(doc);
}).catch(err => {
    console.log('ERROR:', err);
}) // incase saving the document results in error.


    //connect(DB, {
 
//console.log(process.env);
const port = process.env.PORT || 3000;


app.listen( port, ()=>{
    console.log(`App running on port ${port}......`);

});