
const mongoose = require('mongoose');

    //creating a simple tour model with mongoose
const tourSchema = new mongoose.Schema({ 
    name: {
        type: String,
         required: [true, 'A tour must have a name'], //THIS REQUIRED IS CALLED A VALIDATION JUST AS UNIQUE
         unique: true // we added this unique validator in order to make sure we dont have the documents with the same name
    },
    duration : {
        type: String,
        required: [true, 'A tour must have a duration'],
    },
    maxGroupSize : {
        type: Number,
        required: [true, 'A tour must have a groupsize'],
    },
    difficulty : {
        type: String,
        required: [true, 'A tour must have a difficulty'],
    },
    
    ratingsAverage: {
        type: Number,
        default: 4.5
    
     },
    
     ratingsQuantity: {
        type: Number,
        default: 0
    
     },
    price: {
        type: Number,
        required: [true, 'A tour must have a price']
    },
    priceDiscount: Number,

    summary: {
        type: String,
        trim: true,  //true only works with string, it will remove all thw white spaces in the begining and the end.
        required: [true, 'A tour must havve a summary']
    },

    description: {
        type: String,
        trim: true
    },

    imageCover: {
        type: String,
        required: [true, 'A tour must have an image cover' ]
    },
    images: [String],
    createdAt: {
        type: Date,
        default: Date.now() //this will give our created image with a timestamp, mongo will convert it to created date
    },
    startDates: [Date],
});
    
    const Tour = mongoose.model('Tour', tourSchema); //we used capital Tour so we know we are dealing with a model

module.exports = Tour;