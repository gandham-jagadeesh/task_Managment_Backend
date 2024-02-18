//modules
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');


//routesHandlers
const loginRouter = require('./routes/loginRoute');
const registerRouter = require('./routes/registerRoute');


//db
require('./connections/mongodb');

//app
const app = express();


//middlewares
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());




//routes
app.use('/login',loginRouter);
app.use('/register',registerRouter);




app.listen(5000,()=>{
    console.log('listening at 5000 port');
});