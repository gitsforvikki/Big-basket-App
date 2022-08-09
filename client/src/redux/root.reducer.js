import { combineReducers } from "redux"; 
import * as bigbasketReducer from './product/bigbasket.reducer';

export const rootReducer = combineReducers({
    [bigbasketReducer.bigBasketFeatureKey] : bigbasketReducer.reducer    
});


