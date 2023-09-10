const app = require ('./app'); //importing the app.js to use in the server.js

const port = 3000;

app.listen( port, ()=>{
    console.log(`App running on port ${port}......`);

});