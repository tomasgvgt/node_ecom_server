const express = require('express');
const path = require('path');
const port = process.env.PORT || 3000;
const app = express();
const routes = require('./routes');
const {sendError, boomErrorHandler} = require('./middlewears/errorhandler');
const cors = require('cors');


let allowedOrigins = ["http://localhost:8080", "http://localhost:8080", "http://testsite.com"];

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

0


app.use(express.json());
app.use('/', express.static(path.join(__dirname, 'public')));

routes(app);

app.use(boomErrorHandler);
app.use(sendError);


app.listen(port, ()=>{
  console.log(`Server listening on: ${port}`)
})

