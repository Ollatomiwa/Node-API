const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({path: './config.env'});
const app = require ('./app'); //importing the app.js to use in the server.js


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
        // console.log(con.connections);
    });


    //connect(DB, {
 
//console.log(process.env);
const port = process.env.PORT || 3000;


app.listen( port, ()=>{
    console.log(`App running on port ${port}......`);

});