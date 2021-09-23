
//Require Express to run server and routes
const express = require('express');
const app = express();

//Start up an instance of app
const bodyParser = require('body-parser');
//Middleware
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

//Initialize the main project folder
app.use(express.static('website'));

//Setup Server
//Port number
const port = 5000;

//Run server
app.listen(port, listening);
function listening() {
    console.log(`Server running on localhost: ${port}`);
};

// Setup empty JS object to act as endpoint for all routes
let projectData = {};

//Post Route
app.post('/postData', addInfo);
function addInfo(request, response){ 
    const reqBody = request.body;
    projectData = {
        date: reqBody.date,
        city: reqBody.cityName,
        temp: reqBody.cityTemp,
        content: reqBody.feelings
    };
};

// Callback function to complete GET '/all'
app.get('/all', all);
function all(request, response) {
    response.send(projectData);
};