import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import App from './App';
import { event } from 'jquery';
import axios from 'axios';
import CreateUser from './components/user-create.component';


export default class Login extends Component {
    constructor(props) {
        super(props);
        
    }

    loginUser(user_id, pass){
        const user = {
            user_id: user_id,
            password: pass
        }

        axios.post ('http://localhost:5000/users/login', user)
        .then(res => alert(res.data.message));
        //console.log("login user " +user)
    }


    render(){
        return (
<div>
<form onSubmit={(event) => {
    event.preventDefault();
    const user_id = event.target.user_id.value;
    const password = event.target.Password.value;
    this.loginUser(user_id,password)
   // console.log("try" +user_id +password)

}}>
  <div className="form-group">
    <label>User ID</label>
    <input  type="number" 
            className="form-control" 
            name="user_id"
        
    ></input>
    <small className="form-text text-muted">We'll never share your ID with anyone else.</small>
  </div>
  <div className="form-group">
    <label>Password</label>

    <input  type="password" 
            className="form-control" 
            name="Password"
    ></input>
  </div>
  
  <button type="submit" className="btn btn-primary"><center>Submit</center></button>

  <br /><h5><center>Don't have account? <Link to="/register">Register with USIM Official email</Link></center></h5> 
  

</form>
</div>
        )
        
    }
}