const { response, request } = require('express');
const express =  require('express');
const Product = require('../model/Products');

const router = express.Router();

//get all the product
router.get('/products' , async (request , response)=>{
    try{
        let products  = await Product.find();
        response.status(200).json(products)
    }
    catch(error){
        console.log(error);
        response.status(500).json({
            error : error.message
        })

    }
});

//get a single product
router.get('/products/:id' , async (request , response)=>{
    let productId = request.params.id;
    try{
        let product = await Product.findById(productId);
        response.status(200).json(product)
    }
    catch(error){
        console.log(error);
        response.status(500).json({
            error : error.message
        })
    }
});

//create a product
router.post('/products' , async (request , response)=>{
    let newProduct = {
        name:request.body.name,
        image : request.body.image,
        price : request.body.price,
        qty : request.body.qty,
        info : request.body.info
    };
    try{
        //check if product is already exist or not
        let isMatch   = await Product.findOne({name : newProduct.name});
        if(isMatch){
            response.status(401).json({
                msg : 'Product is already exist'
            })
        }
        else{
            //save to the database
            product = new Product(newProduct);
            product = await product.save();
            response.status(200).json({
                result : 'Product Creation success',
                product : product
            })
        }

    }
    catch(error){
        console.log(error);
        response.status(500).json({
            error : error.message
        })
    }
})

//update a product

router.put('/products/:id', async (request , response)=>{
    let productId = request.params.id;
    let updateProduct = {
        name:request.body.name,
        image : request.body.image,
        price : request.body.price,
        qty : request.body.qty,
        info : request.body.info
    };

    try{
        //check product is exist for update or not
        let isAvailable = await Product.findById(productId);
        if(!isAvailable){
            response.status(401).json({
                msg : 'Product does not exist for update'
            })
        }
        else{
            let product = await Product.findByIdAndUpdate(productId ,{
                $set : updateProduct
            },{new : true});
            response.status(200).json({
                result : 'Product update success',
                product : product
            });
        }

    }
    catch(error){
        console.log(error);
        response.status(500).json({
            error : error.message
        })
    }
});
//delete product
router.delete('/products/:id' , async (request , response)=>{
    let productId = request.params.id;
    try{
        //check product is available for delete or not
        let isExist = await Product.findById(productId);
        if(isExist){
            let product = await Product.findByIdAndDelete(productId);
            response.status(200).json({
                product : product
            })
        }
        else{
            response.status(401).json({
                msg : 'product not available'
            })
        }

    }
    catch(error){
        console.log(error);
        response.status(500).json({
            error : error.message
        })
    }
})


module.exports = router;