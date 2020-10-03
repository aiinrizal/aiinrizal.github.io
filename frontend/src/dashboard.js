import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';


import Navbar from "./components/navbar.component";
import ThesisList from "./components/thesis-list.component";
import ThesisEdit from "./components/thesis-edit.component";
import ThesisCreate from "./components/thesis-create.component";
import CreateUser from "./components/user-create.component";
import Search from "./components/search.component";
//import JoinForm from "./components/joinForm-field";

function Dashboard() {
  return (
    <Router>
      <div className="container">
      
      <Navbar />
      <br />
      <Route path="/" exact component= {ThesisList} />
      <Route path="/edit/:user_id" component={ThesisEdit} />
      <Route path="/create" component={ThesisCreate} />
      <Route path="/user" component={CreateUser} />
      <Route path="/search" component={Search} />
    
      </div>
    </Router>
   
  );
}

export default Dashboard;
