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
import Logout from './Logout';
import ErroR from './ErroR';

var jwt = require('jsonwebtoken');

function isLogged() {
  var x = JSON.stringify(localStorage.getItem("TOKEN_KEY"));
  console.log(x);
  if(x === "") {
    return true;
  } else {
    return false;
  }
}

// function getCookie(cname) {
//   var name = cname + "=";
//   var decodedCookie = decodeURIComponent(document.cookie);
//   var ca = decodedCookie.split(';');
//   for(var i = 0; i <ca.length; i++) {
//     var c = ca[i];
//     while (c.charAt(0) == ' ') {
//       c = c.substring(1);
//     }
//     if (c.indexOf(name) == 0) {
//       return c.substring(name.length, c.length);
//     }
//   }
//   return "";
// }

// function checkCookie() {
//   var username = getCookie("username");
//   if (username != "") {
//     console.log("dddd");
//     return true;
//   } else {
//     console.log("xxxx");
//     return false;
//   }
// }

function App() {
  return (
      <>
        <Router>
          <div className="container">
            <Navbar />
            {/* <Search /> */}
            <br />
            {isLogged() == true
            ? <Switch>
                <Route path="/thesis" component ={ThesisList} />
                <Route path="/edit/:user_id" component={ThesisEdit} />
                <Route path="/create" component={ThesisCreate} />
                <Route path="/profile" component={UserList} />
                <Route path="/setting/:user_id" component={EditUser} />
                <Route path="/chart" component ={DataVisualisation} />
                <Route path="/logout" component={Logout} />
                <Route path="/home" component={Home} />
                <Route path="/search" component={Search} />
                <Route component={ErroR} />
              </Switch>
            
            : <Switch>
                <Route path="/login" exact component= {Login} />
                <Route path="/register" component={CreateUser} />
                <Route path="/home" component={Home} />
              </Switch>
            }
            {/* <Route path="/login" exact component= {Login} /> */}
            <footer id="footer">
              <div className="empty-container" style={{ marginTop: 20 }}></div>
              <div className="container">
                <center>Copyrights from A'in Hazwani Ahmad Rizal</center><br />
              </div>
            </footer>
          </div>
        </Router>
    </>
  );
}

export default App;
