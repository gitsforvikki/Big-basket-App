import Axios from 'axios';

export const UPDATE_INPUT = 'UPDATE_INPUT';

export const FETCH_ALL_PRODUCTS_REQUEST = 'FETCH_ALL_PRODUCTS_REQUEST';
export const FETCH_ALL_PRODUCTS_SUCCESS = 'FETCH_ALL_PRODUCTS_SUCCESS';
export const FETCH_ALL_PRODUCTS_FAILURE = 'FETCH_ALL_PRODUCTS_FAILURE';

export const FETCH_SINGLE_PRODUCT_REQUEST = 'FETCH_SINGLE_PRODUCT_REQUEST';
export const FETCH_SINGLE_PRODUCT_SUCCESS = 'FETCH_SINGLE_PRODUCT_SUCCESS';
export const FETCH_SINGLE_PRODUCT_FAILURE = 'FETCH_SINGLE_PRODUCT_FAILURE';

export const CREATE_PRODUCTS_REQUEST = 'CREATE_PRODUCTS_REQUEST';
export const CREATE_PRODUCT_SUCCESS = 'CREATE_PRODUCT_SUCCESS';
export const CREATE_PRODUCTS_FAILURE = 'CREATE_PRODUCTS_FAILURE';

export const UPDATE_PRODUCTS_REQUEST = 'UPDATE_PRODUCTS_REQUEST';
export const UPDATE_PRODUCT_SUCCESS = 'UPDATE_PRODUCT_SUCCESS';
export const UPDATE_PRODUCTS_FAILURE = 'UPDATE_PRODUCTS_FAILURE';

export const DELETE_PRODUCT_REQUEST = 'DELETE_PRODUCT_REQUEST';
export const DELETE_PRODUCT_SUCCESS = 'DELETE_PRODUCT_SUCCESS';
export const DELETE_PRODUCT_FAILURE = 'DELETE_PRODUCT_FAILURE';




//fetch all products
export const fetchAllProducts =()=>{
    return  async (dispatch)=>{
        try{
                dispatch({type:FETCH_ALL_PRODUCTS_REQUEST});
                let dataUlr='http://127.0.0.1:5000/api/products';
                let response = await Axios.get(dataUlr);
                dispatch({type : FETCH_ALL_PRODUCTS_SUCCESS , payload : response.data}); 
        }
        catch(error){
            console.log(error);
            dispatch({type : FETCH_ALL_PRODUCTS_FAILURE , payload : error});
        }
    }
};


//fetch single products

export const fetchSingleProduct =(productId)=>{
        return async (dispatch)=>{
            try{
                dispatch({type : FETCH_SINGLE_PRODUCT_REQUEST});
                let dataUrl = `http://127.0.0.1:5000/api/products/${productId}`;
                let response = await  Axios.get(dataUrl);
                dispatch({type : FETCH_SINGLE_PRODUCT_SUCCESS , payload : response.data});
            }catch(error){
                dispatch({type : FETCH_SINGLE_PRODUCT_FAILURE , payload :error});
            }
        }
};


//create product
export const createProduct = (newProduct , navigate)=>{
    return  async (dispatch)=>{
        try{
            dispatch({type : CREATE_PRODUCTS_REQUEST});
            let dataUrl = 'http://127.0.0.1:5000/api/products';
            let response = await Axios.post(dataUrl , newProduct);
            dispatch({type : CREATE_PRODUCT_SUCCESS , payload : response.data});
            navigate('/products/admin');
        }
        catch(error){
            dispatch({type : CREATE_PRODUCTS_FAILURE , payload : error});
        }
    }
}


//update product
export const updateProduct = (productId , product , navigate)=>{
    return  async (dispatch)=>{
        try{
            dispatch({type : UPDATE_PRODUCTS_REQUEST});
            let dataUrl = `http://127.0.0.1:5000/api/products/${productId}`;
            let response = await Axios.put(dataUrl , product);
            dispatch({type : UPDATE_PRODUCT_SUCCESS , payload : response.data});
            navigate('/products/admin');
        }
        catch(error){
            dispatch({type : UPDATE_PRODUCTS_FAILURE , payload : error});
        }
    }
};

//DELETE product
export const deleteProduct = (productId)=>{
    return  async (dispatch)=>{
        try{
            dispatch({type : DELETE_PRODUCT_REQUEST});
            let dataUrl = `http://127.0.0.1:5000/api/products/${productId}`;
            let response = await Axios.delete(dataUrl);
            dispatch({type : DELETE_PRODUCT_SUCCESS , payload : response.data});
        }
        catch(error){
            dispatch({type : DELETE_PRODUCT_FAILURE , payload : error});
        }
    }
};

export const updateInput = (key , value)=>{
        return {
            type : UPDATE_INPUT,
            payload:{key ,value}
        }
};

