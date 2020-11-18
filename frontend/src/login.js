import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import App from './App';
import axios from 'axios';
import CreateUser from './components/user-create.component';
import swal from 'sweetalert';
import Cookies from 'js-cookie';
var jwt = require('jsonwebtoken');



export default class Login extends Component {
    constructor(props) {
        super(props);
    }

    loginUser(user_id, pass){
        const user = {
            user_id: user_id,
            password: pass
        }
        
        axios.post('http://localhost:5000/users/login', user)
        .then(res => {
          //console.log(res.data.token);
          if (res.data.status === 'success') {
              //setCookie("username", JSON.stringify(res.data.token), 1);
              // localStorage.setItem("TOKEN_KEY", JSON.stringify(res.data.token));
              // localStorage.setItem("TOKEN_KEY", "haii");
              localStorage.setItem("HELLO", "hello");
              Cookies.set("TOKEN_ME", "test", { expires: 1, domain: "http://localhost:3000" });

              swal("Welcome back", user.user_id, "Success");
              this.props.history.push('/');
          }else if (res.data.status === 'email_error_login'){
              swal("Invalid email", "Try again", "Warning" );
          }else if (res.data.status === 'password_error_login'){
              swal("Invalid Password", "Password does not match", "Warning");
          }else if(res.data.status === "empty") {
              swal("Empty", "Email or username was empty", "Warning");
          }
        });
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
            }}>
              <div className="form-group">
                <label>User ID</label>
                <input  type="number" className="form-control" name="user_id"></input>
                <small className="form-text text-muted">We'll never share your ID with anyone else.</small>
              </div>
              <div className="form-group">
                <label>Password</label>
                <input  type="password" className="form-control" name="Password"></input>
              </div>
              
              <button type="submit" className="btn btn-primary"><center>Submit</center></button>

              <br />
              <h5><center>Don't have account? <Link to="/register">Register with USIM Official email</Link></center></h5> 
            </form>
          </div>
        );
    }
}