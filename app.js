const express = require ('express');
const fs = require ('fs');

const app = express();

app.use(express.json());

// app.get('/', (req,res) =>{


//     res.json({message:'Hello from this server...', app: 'ComputAPI'});

// });

// app.post('/', (req, res) =>{
//     res.send(`you can continue your post.....`);
// });

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev_data/data/tours-simple.json`))


app.get('/api/v1/tours', (req, res) => {
    res.status(200).json({
        status: 'success',
        results: tours.length,
        data: {
            tours,
        },
    });

});

app.get('/api/v1/tours/:id', (req, res) => {

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

});

app.post ('/api/v1/tours', (req, res) => {

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
    });


    // Patch up content: Update the content of an object/file
    app.patch('/api/v1/tours/:id', (req, res) => {

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
    
    });

    // delete file with .delete

    app.delete('/api/v1/tours/:id', (req, res) => {

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
    
    }); 

const port = 3000;

app.listen( port, ()=>{
    console.log(`App running on port ${port}......`);

});