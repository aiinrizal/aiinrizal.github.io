import { Component } from "react";
import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
//import Cookies from 'js-cookie';

//Cookies.remove("TOKEN_", { domain: "http://localhost:3000" });
localStorage.removeItem("KEY");
// document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
//this.props.history.push('/login');

function Logout() {
  return (
    <div className="container">
      <Redirect to="/login" />

    </div>
  );
}

export default Logout;