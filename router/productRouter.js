const express = require('express');
const router = express.Router();
const Product = require('../models/Product');




//get all the products
router.get('/products',async (request , response)=>{
   try {
       let products = await Product.find();
       response.status(200).json(products);
   }
   catch (error) {
       console.log(error);
       response.status(500).json({
           error : error.message
       });
   }
});

//get a single product
router.get('/products/:id' ,async (request , response)=>{
    let productId = request.params.id;
    try {
        let product = await Product.findById(productId);
        response.status(200).json(product);
    }
    catch (error) {
        console.log(error);
        response.status(500).json({
           error : error.message
        });
    }
});

//create a product
router.post('/products' , async (request , response)=>{
    let newProduct = {
        name : request.body.name,
        image : request.body.image,
        price : request.body.price,
        qty : request.body.qty,
        info : request.body.info

    };

    try {

        //check is product is already exist or not
       let product = await  Product.findOne({name : newProduct.name});

        if (product){
            return response.status(401).json({
                msg : 'Product is already exist...'
            });
        }

        //save to database
        product = new Product(newProduct);
        product = await product.save();
        response.status(200).json({
            result : 'Product Created successfully.',
            product :product
        });
    }
    catch (error) {
        console.log(error);
        response.status(501).json({
            error : error.message
        });
    }
});


//update a product
router.put('/products/:id',async (request , response)=>{
    let productId = request.params.id;
    let updateProduct = {
        name : request.body.name,
        image : request.body.image,
        price : request.body.price,
        qty : request.body.qty,
        info : request.body.info
    };
    try {
        //is product is available for update or not
        let product = await Product.findById(productId);
        if (!product){
            return response.status(401).json({
                msg : 'Product is not here for Update.'
            });
        }
        //Update Product
        product = await Product.findByIdAndUpdate(productId, {
            $set : updateProduct
        },{new: true});
        response.status(200).json({
            msg : 'Product Update successfully',
            product : product
        });
    }
    catch (error) {
        console.log(error);
        response.status(401).json({
            msg : error.message
        });
    }
});

//delete a product
router.delete('/products/:id' , async (request , response)=>{
    let productId = request.params.id;
    try {
        // check product is here or not
        let product = await Product.findById(productId);
        if (!product){
            return response.status(401).json({
                msg:'Product is not here for delete.'
            });
        }

        //delete from database
        product = await Product.findByIdAndDelete(productId);
        response.status(200).json({
            msg:'product deleted successfully',
            product : product
        });
    }
    catch (e) {

    }
});










module.exports = router;