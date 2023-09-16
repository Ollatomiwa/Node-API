// const fs = require ('fs');
const Tour = require('./../models/tourModel');
//const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`));



// exports.checkId = (req, res, next, val) => { //we use param here for not repeating codes
//     console.log(`Tour id is: ${val}`);
//     //the below codes will execute for all tours that uses 'id'.
//     if(req.params.id * 1 > tours.length){
//        return res.status(404) . json({
//             status: 'failed',
//             message: 'Invalid Id',
//         });

//     };
//     next();

// }; 
// the below code is for .POST, it  checks if name or price is inputted, if not it bring out the below message.
exports.checkBody = (req,res,next) => {
    if (!req.body.name || !req.body.price ) {
        return res.status(404) . json({
            status: 'fail',
            message: 'cannot find name or price'
        });
        
    }
    next();
}

exports.getTour = (req, res) => {
    console.log(req.requestTime);
    res.status(200).json({
        status: 'success',
        requestedAt: req.requestTime, // this returns the date and time a the response was sent.
        // results: tours.length,
        // data: {
        //     tours,
        // },
    });

};

exports.getTourId = (req, res) => {

    const id = req.params.id * 1;
    // const tour = tours.find(el => el.id === id);
    // res.status(200).json({
    //     status: 'success',
        
    //     data: {
    //         tour,
    //     },
    // });

};

exports.createTour = (req, res) => {
    res.status(201) .json({
        status: 'success!',
        data: {
            tour: newTour
        }
    });
};

exports.updateTour = (req, res) => {
    res.status(200).json({
        status: 'success',
        
        data: {
            tour: '<Update Tours .....>'
        },
    });

};

exports.deleteTour = (req, res) => {
    res.status(204).json({
        status: 'success',
        
        data: null
    });

};