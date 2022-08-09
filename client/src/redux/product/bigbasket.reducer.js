import * as bigbasketActions from './bigbasket.actions';

export const bigBasketFeatureKey = 'bigBasket';

let initialState = {
    loading : false,
    products : [],
    singleProduct :{},
    errorMessage :''
}

export const reducer = (state = initialState , action)=>{
    let {type , payload} = action;
    switch (type) {
        case bigbasketActions.FETCH_ALL_PRODUCTS_REQUEST :
            return {
                ...state,
                loading : true
            };

        case bigbasketActions.FETCH_ALL_PRODUCTS_SUCCESS : 
            return {
                ...state,
                loading : false,
                products : payload
            };
        case bigbasketActions.FETCH_ALL_PRODUCTS_FAILURE : 
            return {
                ...state,
                loading :false,
                errorMessage : payload
            };
        //fetch single  product

        case bigbasketActions.FETCH_SINGLE_PRODUCT_REQUEST :
            return {
                ...state,
                loading : true
            };

        case bigbasketActions.FETCH_SINGLE_PRODUCT_SUCCESS : 
            return {
                ...state,
                loading : false,
                singleProduct : payload
            };
        case bigbasketActions.FETCH_SINGLE_PRODUCT_FAILURE : 
            return {
                ...state,
                loading :false,
                errorMessage : payload
            };

        //create product
        case bigbasketActions.CREATE_PRODUCTS_REQUEST :
            return {
                ...state,
                loading : true
            };

        case bigbasketActions.CREATE_PRODUCT_SUCCESS : 
            return {
                ...state,
                loading : false
            };
        case bigbasketActions.CREATE_PRODUCTS_FAILURE : 
            return {
                ...state,
                loading :false,
                errorMessage : payload
            };

        //update product
        case bigbasketActions.UPDATE_PRODUCTS_REQUEST :
            return {
                ...state,
                loading : true
            };

        case bigbasketActions.UPDATE_PRODUCT_SUCCESS : 
            return {
                ...state,
                loading : false
            };
        case bigbasketActions.UPDATE_PRODUCTS_FAILURE : 
            return {
                ...state,
                loading :false,
                errorMessage : payload
            };
        
        //delete product
        case bigbasketActions.DELETE_PRODUCT_REQUEST :
            return {
                ...state,
                loading : true
            };

        case bigbasketActions.DELETE_PRODUCT_SUCCESS : 
            return {
                ...state,
                loading : false
            };
        case bigbasketActions.DELETE_PRODUCT_FAILURE : 
            return {
                ...state,
                loading :false,
                errorMessage : payload
            };

        case bigbasketActions.UPDATE_INPUT:
                return {
                    ...state,
                    singleProduct: {
                        ...state.singleProduct,
                        [payload.key] : payload.value
                    }
                };

                
            
    
        default: return state;
           
    }
}