import React, { useEffect } from 'react';
import {Link} from 'react-router-dom';
import {useDispatch , useSelector} from 'react-redux';
import * as bigbasketActions from '../../redux/product/bigbasket.actions';
import * as bigbasketReducer from '../../redux/product/bigbasket.reducer';
import spinner from '../../assets/img/spinner.png';


let ProductAdmin = ()=>{

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

    let deleteTheProduct = async (productId)=>{
         await dispatch(bigbasketActions.deleteProduct(productId));
         dispatch(bigbasketActions.fetchAllProducts());
    };

    return (
        <React.Fragment>
           <section className='p-3'>
               <div className="container">
                <div className="row">
                    <div className="col">
                        <p className="h3">Products Details</p>
                        <p className="lead">Lorem Ipsum is simply industry. industry's standard dummy text ever since the 1500s, larised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                        <Link to='/products/create' className="btn btn-success btn-sm">Create new</Link>
                    </div>
                </div>
               </div>
           </section>

           {
               (loading)  ? 
               
               <React.Fragment>
                   <img src={spinner}  alt="" className='d-block m-auto' />
               </React.Fragment> 
               
               : 
               
               <React.Fragment>
                   <section className="">
                        <div className="container">
                            <div className="row">
                                <div className="col animated zoomInLeft">
                                    <table className="table table-hover text-center table-striped table-success">
                                        <thead className="bg-dark text-success">
                                        <tr>
                                            <th>SNO</th>
                                            <th>Image</th>
                                            <th>NAME</th>
                                            <th>Price</th>
                                            <th>Qty</th>
                                            <th>Actions</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            products.length > 0 ?
                                                <React.Fragment>
                                                    {
                                                        products.map(product => {
                                                            return (
                                                                <tr key={product._id}>
                                                                    <td>{product._id.substr(product._id.length - 5)}</td>
                                                                    <td>
                                                                        <img src={product.image} alt="" width="50" height="50"/>
                                                                    </td>
                                                                    <td>{product.name}</td>
                                                                    <td>&#8377; {product.price.toFixed(2)}</td>
                                                                    <td>{product.qty} kgs</td>
                                                                    <td>
                                                                        <Link to={`/products/${product._id}`} className="btn btn-secondary btn-sm">Update</Link>
                                                                        <button onClick={deleteTheProduct.bind(this , product._id)} className="btn btn-danger btn-sm">Delete</button>
                                                                    </td>
                                                                </tr>
                                                            )
                                                        })
                                                    }
                                                </React.Fragment> : <React.Fragment>
                                                    <tr>
                                                        <td colSpan="6" className="text-danger font-weight-bold">----------- No Products Found --------- </td>
                                                    </tr>
                                                </React.Fragment>
                                        }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </section>
               </React.Fragment>
           }
        </React.Fragment>
    )
}
export default ProductAdmin;