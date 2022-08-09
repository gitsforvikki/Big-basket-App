import React from 'react';
import {Link} from 'react-router-dom';


let Navbar = ()=>{
    return(
        <React.Fragment>
           <nav className="navbar navbar-dark bg-success  navbar-expand-sm">
                    <div className="container">
                        <Link to='/' className="navbar-brand"> 
                            <i className="fa fa-shopping-cart"/><span className="text-dark">big</span><span className="text-white">basket</span>
                        </Link>
                        <div className="collapse navbar-collapse">
                            <ul className="navbar-nav">
                                <li className="navbar-item">
                                    <Link to='/' className="nav-link text-white">Home</Link>
                                </li>
                                <li className="navbar-item">
                                    <Link to='/products' className="nav-link text-white">Products</Link>
                                </li>
                            </ul>
                            <ul className="  navbar-nav ml-auto">
                                <li className="navbar-item">
                                        <Link to='/products/admin' className="nav-link text-white">Admin</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
           </nav>
        </React.Fragment>
    )
}
export default Navbar;