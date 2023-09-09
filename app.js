const express = require ('express');
const fs = require ('fs');

const app = express();

app.use(express.json());

app.use ((req, res, next) => {
    req.requestTime = new Date () .toISOString();
    next ();
});

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev_data/data/tours-simple.json`))

const getTour = (req, res) => {
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

const getTourId = (req, res) => {

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

const createTour = (req, res) => {
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

const updateTour = (req, res) => {

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

const deleteTour = (req, res) => {

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

// refractor our codes like this or

// app.get('/api/v1/tours', getTour);
// app.get('/api/v1/tours/:id', getTourId );
// app.post ('/api/v1/tours', creatTour );
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour); 

// using app.routes 

app.route ('/api/v1/tours').get(getTour).post(createTour);
app.route ('/api/v1/tours/:id').get(getTourId).patch(updateTour).delete(deleteTour)

const port = 3000;

app.listen( port, ()=>{
    console.log(`App running on port ${port}......`);

});