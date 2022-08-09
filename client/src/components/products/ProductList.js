import React, { useEffect } from 'react';
import {useDispatch , useSelector} from 'react-redux';
import * as bigbasketActions from '../../redux/product/bigbasket.actions';
import * as bigbasketReducer from '../../redux/product/bigbasket.reducer';
import spinner from '../../assets/img/spinner.png';


let ProductList = ()=>{

    let dispatch = useDispatch();

    //dispatch when component loaded in the React DOM
    useEffect(()=>{
        dispatch(bigbasketActions.fetchAllProducts());
    },[]);

    //geting data from redux-store
    let productInfo = useSelector((state)=>{
        return state[bigbasketReducer.bigBasketFeatureKey];
    });

    let {loading , products} = productInfo;

    return(
        <React.Fragment> 
           
           <section className='p-3'>
               <div className="container">
                <div className="row">
                    <div className="col">
                        <p className="h3"> Available Products</p>
                        <p className="lead">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, larised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                    </div>
                </div>
               </div>
           </section>

           {
                loading ?
                    <React.Fragment>
                        <img src={spinner} alt="" className="d-block m-auto"/>
                    </React.Fragment> :
                    <section className="p-3">
                        <div className="container">
                            <div className="row">
                                {
                                    products.length > 0 ?
                                        <React.Fragment>
                                            {
                                                products.map(product => {
                                                    return (
                                                        <div key={product._id} className="col-md-3">
                                                            <div className="card animated zoomIn">
                                                                <div className="card-header bg-white text-center">
                                                                    <img src={product.image} alt="" width="150" height="150"/>
                                                                </div>
                                                                <div className="card-body text-center">
                                                                    <ul className="list-group">
                                                                        <li className="list-group-item">
                                                                            NAME : {product.name}
                                                                        </li>
                                                                        <li className="list-group-item">
                                                                            Price : &#8377;{product.price.toFixed(2)}
                                                                        </li>
                                                                        <li className="list-group-item">
                                                                            Qty : {product.qty} kgs
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </React.Fragment> : <React.Fragment>
                                            <div className="text-center">
                                                <p className="text-danger font-weight-bold text-center">
                                                    ----------- NO Products Found --------
                                                </p>
                                            </div>
                                        </React.Fragment>
                                }
                            </div>
                        </div>
                    </section>
            }
        </React.Fragment>
    )
}
export default ProductList;