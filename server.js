const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require ('./app'); //importing the app.js to use in the server.js

dotenv.config({path: './config.env'});

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
} ) .then(() => console.log('DB connction succesful'));
 
//console.log(process.env);
const port = process.env.PORT || 3000;


app.listen( port, ()=>{
    console.log(`App running on port ${port}......`);

});