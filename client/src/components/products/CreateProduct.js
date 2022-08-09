import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {useNavigate } from 'react-router-dom';
import * as bigbasketActions from '../../redux/product/bigbasket.actions';



let CreateProduct = ()=>{
    let dispatch = useDispatch();
    let navigate = useNavigate();

    let [product , setProduct] =useState({
            name:'',
            image : '',
            price : '',
            qty : '',
            info :''
    });

    let updateFormInput=(event)=>{
        setProduct({
            ...product,
            [event.target.name] : event.target.value
        })
    };

    //convert image to base64 format
    let convertBase64String = (imageFile)=>{
        return new Promise((resolve , reject)=>{
            let fileReader = new FileReader();
            fileReader.readAsDataURL(imageFile);
            fileReader.addEventListener('load', ()=>{
                if(fileReader.result){
                    resolve(fileReader.result);
                }
                else {
                    reject('Error Occurred');
                }
            })
        });
    };

    let updateImage= async (event)=>{
        let imageProfile = event.target.files[0];
        let base64Image = await convertBase64String(imageProfile);
        setProduct({
            ...product,
            [event.target.name] : base64Image
        })
    };



    let submitProduct=(event)=>{
        event.preventDefault();
        dispatch(bigbasketActions.createProduct(product , navigate));
    }
    
    return (
        <React.Fragment>
        
        <section className="p-3">
            <div className="container">
                <div className="row">
                    <div className="col animated zoomIn">
                        <p className="h3 ">Create a new product</p>
                        <p className="lead">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid amet consequuntur, corporis, cumque dolore ea enim esse eveniet exercitationem fugit in iste itaque necessitatibus nemo nisi officiis qui totam. Explicabo!</p>
                        
                    </div>
                </div>
            </div>
        </section>
        
        <section>
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <div className="card animated zoomInLeft delay-1s">
                            <div className="card-header text-white bg-secondary">
                                <p className="h4">Create Here</p>
                            </div>
                            <div className="card-body rgba-purple-light">
                                <form onSubmit={submitProduct}>
                                    <div className="form-group">
                                        <input
                                            name="name"
                                            value={product.name}
                                            onChange={updateFormInput}
                                            required type="text" className="form-control" placeholder="Product Name"/>
                                    </div>
                                    <div className="form-group">
                                        <div className="custom-file">
                                            <input
                                                name="image"
                                                onChange={updateImage}
                                                type="file" className="custom-file-input" id="customFile"/>
                                            <label className="custom-file-label" htmlFor="customFile">
                                                {
                                                    product.image !== '' ?
                                                        <img src={product.image} alt="" width="25" height="25"/> :
                                                        <span>Product Image</span>
                                                }
                                            </label>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <input
                                            name="price"
                                            value={product.price}
                                            onChange={updateFormInput}
                                            required type="number" className="form-control" placeholder="Price"/>
                                    </div>
                                    <div className="form-group">
                                        <input
                                            name="qty"
                                            value={product.qty}
                                            onChange={updateFormInput}
                                            required type="number" className="form-control" placeholder="Available Qty"/>
                                    </div>
                                    <div className="form-group">
                                           <textarea
                                               name="info"
                                               value={product.info}
                                               onChange={updateFormInput}
                                               required className="form-control" rows='2'  placeholder="Product Info"/>
                                    </div>
                                    <div>
                                        <input type="submit" className="btn btn-secondary btn-sm" value="Create"/>
                                    </div>
                                </form>
                                <small>*Name of the products must be unique.</small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <div style={{marginBottom : '150px'}}/>
    </React.Fragment>
    )
}
export default CreateProduct;