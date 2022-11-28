const express = require('express');
const path = require('path');
const app = express();
const routes = require('./routes');
const {sendError, boomErrorHandler, sequelizeErrorHandler} = require('./middlewears/errorhandler');
const authentication = require('./middlewears/auth');
const cors = require('cors');
const port = process.env.PORT || 3000;


let allowedOrigins = ["http://localhost:8080"];

//cors configuration
app.use(cors({
  origin: (origin, callback) => {
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){ // If a specific origin isn’t found on the list of allowed origins
      let message = 'The CORS policy for this application doesn’t allow access from origin ' + origin;
      return callback(new Error(message ), false);
    }
    return callback(null, true);
  }
}));


//Valid request body formats
app.use(express.json());

//Serve static files
app.use('/', express.static(path.join(__dirname, 'public')));

//Use designed router
routes(app);

//Get request to verify authentication
app.get('/auth-endpoint', authentication, (req, res, next)=>{
  res.status(200);
  res.send({
    message: 'Welcome to the application'
  });
})

//Error Middlewears
app.use(sequelizeErrorHandler);
app.use(boomErrorHandler);
app.use(sendError);


app.listen(port, ()=>{
  console.log(`Server listening on: ${port}`)
})

