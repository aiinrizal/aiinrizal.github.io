import { Component } from "react";
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

localStorage.setItem("TOKEN_KEY", "");
document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
//this.props.history.push('/login');

function error() {
  return (
    <div className="container">
      ERROR
    </div>
  );
}

export default error;