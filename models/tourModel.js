const mongoose = require('mongoose');

    //creating a simple tour model with mongoose
const tourSchema = new mongoose.Schema({ 
    name: {
        type: String,
         required: [true, 'A tour must have a name'], //THIS REQUIRED IS CALLED A VALIDATION JUST AS UNIQUE
         unique: true // we added this unique validator in order to make sure we dont have the documents with the same name
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
    
    const Tour = mongoose.model('Tour', tourSchema); //we used capital Tour so we know we are dealing with a model

module.exports = Tour;