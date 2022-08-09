import React, { useEffect } from 'react';
import { useDispatch , useSelector } from 'react-redux';
import { useParams , useNavigate } from 'react-router-dom';
import * as bigbasketActions from '../../redux/product/bigbasket.actions';
import * as bigbasketReducer from '../../redux/product/bigbasket.reducer';


let UpdateProduct = ()=>{
    let dispatch = useDispatch();
    let navigate = useNavigate();
    //product Id
    let productId = useParams().id;


    //get the singleProduct
    let productInformation = useSelector((state)=>{
        return state[bigbasketReducer.bigBasketFeatureKey];

    });

    let { singleProduct } = productInformation;



    //dispatch an action when component loaded
    useEffect(() => {
        dispatch(bigbasketActions.fetchSingleProduct(productId));
    }, [productId]);

    //submitted product
    let submitProduct = (event) => {
        event.preventDefault();
       dispatch(bigbasketActions.updateProduct(productId , singleProduct , navigate))
    };




    /*.........................Update input form.............................*/


    //dispatch function to update form input
    let updateFormInput = (event)=>{
        dispatch(bigbasketActions.updateInput(event.target.name , event.target.value));
    };


    // updateImage function
    let  updateImage = async (event) => {
        let imageFile = event.target.files[0];
        let base64Image = await convertBase64String(imageFile);
        dispatch(bigbasketActions.updateInput(event.target.name , base64Image));
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


    return(

        <React.Fragment>
            {/*<pre>{JSON.stringify(singleProduct)}</pre>*/}
            <section className="p-3">
                <div className="container">
                    <div className="row">
                        <div className="col animated zoomIn">
                            <p className="h3 ">Update a Product</p>
                            <p className="lead">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid amet consequuntur, corporis, cumque dolore ea enim esse eveniet exercitationem fugit in iste itaque necessitatibus nemo nisi officiis qui totam. Explicabo!</p>
                            
                        </div>
                    </div>
                </div>
            </section>
            {/* <pre>{JSON.stringify(selectedProduct)}</pre>*/}
            <section>
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="card animated zoomInLeft delay-1s">
                                <div className="card-header text-white bg-secondary">
                                    <p className="h4">Update Product</p>
                                </div>
                                <div className="card-body rgba-purple-light">
                                    <form onSubmit={submitProduct}>
                                        <div className="form-group">
                                            <input
                                                name="name"
                                                value={singleProduct.name}
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
                                                        singleProduct.image !== '' ?
                                                            <img src={singleProduct.image} alt="" width="25" height="25"/> :
                                                            <span>Product Image</span>
                                                    }
                                                </label>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <input
                                                name="price"
                                                value={singleProduct.price}
                                                onChange={updateFormInput}
                                                required type="number" className="form-control" placeholder="Price"/>
                                        </div>
                                        <div className="form-group">
                                            <input
                                                name="qty"
                                                value={singleProduct.qty}
                                                onChange={updateFormInput}
                                                required type="number" className="form-control" placeholder="Available Qty"/>
                                        </div>
                                        <div className="form-group">
                                               <textarea
                                                   name="info"
                                                   value={singleProduct.info}
                                                   onChange={updateFormInput}
                                                   required className="form-control" rows='2'  placeholder="Product Info"/>
                                        </div>
                                        <div>
                                            <input type="submit" className="btn btn-secondary btn-sm" value="Update"/>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div style={{marginBottom : '150px'}}/>
        </React.Fragment>
    )
};
export  default UpdateProduct;