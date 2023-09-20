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
// exports.checkBody = (req,res,next) => {
//     if (!req.body.name || !req.body.price ) {
//         return res.status(404) . json({
//             status: 'fail',
//             message: 'cannot find name or price'
//         });
        
//     }
//     next();
// }

exports.getTour = async (req, res) => {
    try {
        //BUILDING QUERIES
        //1) FILTERING
        const queryObj = {...req.query};
        const excludedFields = ['page','sort', 'limit', 'fields'];
        excludedFields.forEach(el =>delete queryObj[el]);

        //2) ADVANCE FILTERING
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
        let query = Tour.find(SON.parse(queryStr));
        
        //3 SORTING

        if(req.query.sort) {
            const sortBy = req.query.sort.split(',').join(' ');
            query =query.sort(sortBy);
        } else {
            query = query.sort('-createdAt');
        }

        //4 FIELD LIMITING

        if(req.query.fields) {
            const fields = req.query.fields.split(',').join(' ');
            query =query.select(fields);
        } else {
            query = query.select('-__v');
        }

        //EXECUTE QUERY
        const tours = await query;

        //send response
        // console.log(req.requestTime);
        res.status(200).json({
            status: 'success',
            //requestedAt: req.requestTime, // this returns the date and time a the response was sent.
            results: tours.length,
            data: {
                tours,
            },
        });
        
    } catch (error) {
        res.status(404).json({
            status: 'fail',
            message: error
        });
        
    }

};

exports.getTourId = async (req, res) => {
    try {
        //here we have findbyid, we also have findone to find only one documents
     const tour = await  Tour.findById(req.params.id)
     //Tour.findOne ({_id: req.params.id}) this will give the results as the one above
    //   const tour = tours.find(el => el.id === id);
      res.status(200).json({
          status: 'success',
          
          data: {
              tour,
          },
      });
    } catch (error) {
        res.status(404).json({
            status: 'fail',
            message: error
        });
        
    }

    // const id = req.params.id * 1;

};

exports.createTour = async (req, res) => {
    try {
        //LETS CREATE A NEW DOCUMENT
        // const newTour = new Tour({})
        // Tour.save() // we can use this method or an easier one below
    
        // this is another method to create a new tour document
        const newTour = await Tour.create(req.body);
    
        res.status(201) .json({
            status: 'success!',
            data: {
                tour: newTour
            }
        });
        
    } catch (error) {   //we use this try/catch so incase we created a documents with some neccesary keys also can be a validator
        res.status(400)
         .json({
            status: 'fail',
            message:"invalid"
         })
    }

};

exports.updateTour = async (req, res) => {
    try {
        const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
            new: true, //this way the new updated file will be the one that will be returned
            runValidators: true
        })
        res.status(200).json({
            status: 'success',
            
            data: {
                tour
            },
        });
        
    } catch (error) {
        res.status(404).json({
            status: 'fail',
            message: error
        });
    }

};

exports.deleteTour = async (req, res) => {
    try {
       await Tour.findByIdAndDelete(req.params.id )
        res.status(204).json({
            status: 'success',
            
            data: null
        });
        
    } catch (error) {
        res.status(404).json({
            status: 'fail',
            message: error
        });
        
    }

};