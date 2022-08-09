import React from 'react';
import './App.css';
import {BrowserRouter as Router , Routes ,Route}  from 'react-router-dom';

import Navbar from './components/layouts/Navbar';
import Home from './components/layouts/Home';
import ProductList from './components/products/ProductList';
import ProductAdmin from './components/products/ProductAdmin';
import UpdateProduct from './components/products/UpdateProduct';
import CreateProduct from './components/products/CreateProduct';
let App =()=>{

  return (
    <React.Fragment>
       <Router>
          <Navbar/>
          <Routes>
            <Route path="/"  element={<Home/>} />
            <Route path='/products'  element={<ProductList/>} />
            <Route path='/products/admin' element={<ProductAdmin/>} />
            <Route path='/products/create'  element={<CreateProduct/>} />
            <Route path='/products/:id'  element={<UpdateProduct/>} />
          </Routes>
       </Router>

      
    </React.Fragment>
  );
}
   
export default App;
