const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('./../../models/tourModel');

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

// READ JSON FILE
const tours = JSON.parse (fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8'));

//IMPORT DATA FROM DATABASE

const importData = async () => {
    try {
      await Tour.create(tours);
      console.log('Data successfully imported');
     
    } catch (error) {
        console.log(error);
    }
    process.exit()
};

//DELETE DATA FROM DATABASE

const deleteData = async () => {
    try {
      await Tour.deleteMany();
      console.log('Data successfully deleted');
      
    } catch (error) {
        console.log(error);
    }
    process.exit();
};

if (process.argv[2] === '--import') {
    importData();
    
} else if (process.argv[2] === '--delete') {
    deleteData();
    
}


console.log(process.argv);