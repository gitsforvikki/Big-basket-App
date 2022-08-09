const express = require('express');
const dotenv = require('dotenv');
const cors  = require('cors');
const { default: mongoose } = require('mongoose');
const { router } = require('./router/productRouter');


const app = express();

//config dotenv
dotenv.config();

//config cors
app.use(cors());

//config express to accept json data
app.use(express.json());

const hostName = process.env.HOST_NAME;
const port = process.env.PORT;



//conect mongodb 
mongoose.connect(process.env.MONGO_DB_LOCAL_URL).then((response)=>{
    console.log('mongoDB connected successfully...........');
}).catch((error)=>{
    console.error(error);
    process.exit(1);
});

app.use('/api' , require('./router/productRouter'));

app.get('/' , (request , response)=>{
    response.send(`<h2>Welcome to BigBasket Server Application</h2>`);

})

app.listen(port , hostName,()=>{
    console.log(`Express serve is started at http://${hostName}:${port}`);
} );