import React, { Component } from 'react';
import { Link } from 'react-router-dom';
//import {useCombobox} from 'downshift';
//import {Input} from 'antd';

function Navbar() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link to="/" className="navbar-brand">ThesisQ</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
              <span className="navbar-toggler-icon"></span>
            </button>

         <div className="collapse navbar-collapse" id="collapsibleNavbar">
                  <ul className="navbar-nav">
                        <li className="navbar-item active">
                            <Link to="/thesis" className="nav-link">Thesis</Link>
                        </li>

                        <li className="navbar-item">
                            <Link to="/create" className="nav-link">Add Thesis</Link>
                        </li>

                        <li className="navbar-item">
                            <Link to="/profile" className="nav-link">Registered Users</Link>
                        </li>

                        <li className="navbar-item">
                            <Link to="/chart" className="nav-link">Data Visualisation</Link>
                        </li>

                        <li className="navbar-item">
                            <Link to="/search" className="nav-link">Search</Link>
                        </li>

                        <li className="navbar-item">
                            <Link to="/logout" className="nav-link">Logout</Link>
                        </li>
                        

                    </ul>
                    {/* <form class="form-inline my-2 my-lg-0">
      <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" onChange={(e)=>this.searchSpace(e)}/>
      <button class="btn btn-outline-success my-2 my-sm-0" type="submit" >Search</button>
    </form>  */}

                    

                    </div>
                    
                
            </nav>
        )

        

    
    
    

    
        
}
export default Navbar;


    
    
