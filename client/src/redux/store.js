import {configureStore} from '@reduxjs/toolkit';
import { rootReducer } from './root.reducer';
//import logger from 'redux-logger';
//import {ThunkAction} from 'redux-thunk';
export const store = configureStore({reducer : rootReducer});
