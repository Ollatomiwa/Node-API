const fs = require ('fs');

const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev_data/data/tours-simple.json`));

exports.getTour = (req, res) => {
    console.log(req.requestTime);
    res.status(200).json({
        status: 'success',
        requestedAt: req.requestTime, // this returns the date and time a the response was sent.
        results: tours.length,
        data: {
            tours,
        },
    });

};

exports.getTourId = (req, res) => {

    const id = req.params.id * 1;
    const tour = tours.find(el => el.id === id);

    if(!tour){
        res.status(404) . json({
            status: 'error',
            message: 'Invalid Id',
        });
    }
    res.status(200).json({
        status: 'success',
        
        data: {
            tour,
        },
    });

};

exports.createTour = (req, res) => {
    const newId = tours[tours.length -1] .id +1;
    const newTour = Object.assign({id: newId}, req.body);
    tours.push (newTour);
    fs.writeFile (`${__dirname}/dev_data/data/tours-simple.json`, JSON.stringify(tours), err => {
        res.status(201) .json({
            status: 'success!',
            data: {
                tour: newTour
            }
        });
    
    });
};

exports.updateTour = (req, res) => {

    if(req.params.id * 1 > tours.length){
        res.status(404) . json({
            status: 'failed',
            message: 'Invalid Id',
        });
    }
    res.status(200).json({
        status: 'success',
        
        data: {
            tour: '<Update Tours .....>'
        },
    });

};

exports.deleteTour = (req, res) => {

    if(req.params.id * 1 > tours.length){
        res.status(404) . json({
            status: 'failed',
            message: 'Invalid Id',
        });
    }
    res.status(204).json({
        status: 'success',
        
        data: null
    });

};