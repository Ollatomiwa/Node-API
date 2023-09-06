const express = require ('express');
const fs = require ('fs');

const app = express();

// app.get('/', (req,res) =>{


//     res.json({message:'Hello from this server...', app: 'ComputAPI'});

// });

// app.post('/', (req, res) =>{
//     res.send(`you can continue your post.....`);
// });

app.use(express.json());

const tours = JSON.parse( fs.readFileSync(`${__dirname}/dev_data/data/tours-simple.json`));


app.get (`api/v1/tours`, (req, res) => {
        res.status(200) .json({
            status: "suceess",
            result: tours.length,
            data: {
                tours
            }
        });
    });

app.post (`api/v1/tours`, (req, res) => {

    const newId = tours[tours.length -1] .id +1;
    const newTour = Object.assign({id: newId}, req.body);
    tours.push = newTour;
    fs.writeFile (`${__dirname}/dev_data/data/tours-simple.json`), JSON.stringify(tours), err => {
        res.status(201) .json({
            status: 'success',
            data: {
                tours: newTour
            }
        });
    };
});
const port = 3000;

app.listen( port, ()=>{
    console.log(`App running on port ${port}......`);

});