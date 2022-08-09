const { default: mongoose } = require("mongoose");

const ProductSchema = new mongoose.Schema({
    name : {
        type:String,
        require:true,
        unique : true
    },
    image:{
        type:String,
        require:true
    },
    price : {
        type:Number,
        require:true,
    },
    qty : {
        type:Number,
        require:true,
    },
    info : {
        type:String,
        require:true,
    },
    created:{
        type:Date,
        default : Date.now()
    }
});

let Product = mongoose.model('product' , ProductSchema);
module.exports = Product;