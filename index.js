const express = require('express');
const path = require('path');
const port = 3000;
const app = express();
const routes = require('./routes');
const {sendError, boomErrorHandler} = require('./middlewears/errorhandler');

app.use(express.json());
app.use('/', express.static(path.join(__dirname, 'public')));

routes(app);

app.use(boomErrorHandler);
app.use(sendError);


app.listen(port, ()=>{
  console.log(`Server listening on: ${port}`)
})

