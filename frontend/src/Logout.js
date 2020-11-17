import { Component } from "react";
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

localStorage.setItem("TOKEN_KEY", "");
document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
//this.props.history.push('/login');

function Logout() {
  return (
    <div className="container">
      {window.location.replace("http://localhost:3000/login")}

    </div>
  );
}

export default Logout;