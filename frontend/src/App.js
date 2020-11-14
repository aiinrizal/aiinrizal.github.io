import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';



import Navbar from "./components/navbar.component";
//import SearchGuest from "./components/search-guest";
import ThesisList from "./components/thesis-list.component";
import ThesisEdit from "./components/thesis-edit.component";
import ThesisCreate from "./components/thesis-create.component";
import CreateUser from "./components/user-create.component";
import Search from "./components/search.component";
import Login from "./login";
import NavbarUser from './components/navbar-user.component';
import EditUser from './components/user-edit.component';
import UserList from './components/user-list.component';
import Home from './components/home';
import DataVisualisation from './components/data-visualisation.component';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
   
    
      <Router>
      <div className="container">
      
      <Navbar />
      {/* <Search /> */}
      <br />
      <Route path="/" exact component= {Login} />
      <Route path="/thesis" component ={ThesisList} />
      <Route path="/edit/:user_id" component={ThesisEdit} />
      <Route path="/create" component={ThesisCreate} />
      <Route path="/register" component={CreateUser} />
      <Route path="/search" component={Search} />
      {/* <Route path="/login" component={Login} /> */}
      <Route path="/profile" component={UserList} />
      <Route path="/setting/:user_id" component={EditUser} />
      <Route path="/home" component={Home} />
      <Route path="/chart" component ={DataVisualisation} />

      <footer id="footer">
        <div className="empty-container" style={{ marginTop: 20 }}></div>
        <div className="container">
          <center>Copyrights from A'in Hazwani Ahmad Rizal</center><br />
        </div>
      </footer>
      </div>

    </Router>
  
   
  );
}

export default App;
