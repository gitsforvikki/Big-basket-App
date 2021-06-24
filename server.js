const express = require('express');
const app = express();//initialized express
const cors = require('cors');
const dotEnt = require('dotenv');
const mongoose = require('mongoose');
const path = require('path');

//configure cors
app.use(cors());

//configure express to receive form data
app.use(express.json());

//configure dotEnv
dotEnt.config();

//access hostname and port number form dot env file
// const hostName = process.env.HOST_NAME;
const port = process.env.PORT || 5000;


//configure router
app.use('/api' , require('./router/productRouter'));

//connect mongoDb
mongoose.connect(process.env.MONGO_DB_CLOUD_URL,{
    useUnifiedTopology:true,
    useNewUrlParser:true,
    useFindAndModify:false,
    useCreateIndex:true
}).then((response)=>{
    console.log("Connected to MongoDb cloud  successfully.....");
}).catch((error)=>{
    console.error(error);
    process.exit(1);//stop the node js process when unable to connect the database.
});


/*
//empty request
app.get('/',(request , response)=>{
    response.send(`<h2>Welcome to Bigbasket Server Application</h2>`);
});
*/


if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname , 'client' , 'build')));
    app.get('/', (request,response) => {
        response.sendFile(path.join(__dirname , 'client' , 'build' , 'index.html'));
    });
}

app.listen(port , ()=>{
    console.log(`Express server is started at PORT : ${port}`);
});


