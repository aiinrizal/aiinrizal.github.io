import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
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

import swal from 'sweetalert';
import axios from 'axios';

var jwt = require('jsonwebtoken');
let TOKEN_KEY = false;

class App extends Component {
  async componentWillMount() {
    await this.isLogged();
  }

  isLogged() {
    //var x = JSON.stringify(localStorage.getItem("TOKEN_KEY"));
    
    var x = localStorage.getItem("KEY");
  
    console.log("localstorage", x);
    if(x == "xxxx") {
      return true;
    } else {
      return false;
    }
  }

  setLogin() {
    TOKEN_KEY = true;
    console.log("aaaaa", TOKEN_KEY);
    localStorage.setItem("KEY", "xxxx");
  }

  loggedOut() {
    TOKEN_KEY = false;
    this.setState({ logged: false });
  }

  loginUser(username, pass) {
    const user = {
      user_id: username,
      password: pass
    }

    axios.post('http://localhost:5000/users/login', user)
    .then(res => {
      //console.log(res.data.token);
      if (res.data.status === 'success') {
          console.log("haii", TOKEN_KEY);
          this.setLogin();
          this.setState({ logged: true });
          swal("Welcome back", user.user_id, "Success");
          // this.props.history.push('/');
      }else if (res.data.status === 'email_error_login'){
          swal("Invalid email", "Try again", "Warning" );
      }else if (res.data.status === 'password_error_login'){
          swal("Invalid Password", "Password does not match", "Warning");
      }else if(res.data.status === "empty") {
          swal("Empty", "Email or username was empty", "Warning");
      }
    });
  }

  constructor(props)  {
    super(props);
    this.state = {
      logged: false
    }
    //this.loginUser = this.loginUser.bind(this);

  }

  render() {
    const logout_l = () => (
      <div>
        hello {this.loggedOut()}
      </div>
    );
    const loginn = () => (
      <div>
        <form onSubmit={(event) => {
          event.preventDefault();
          const user_id = event.target.user_id.value;
          const password = event.target.Password.value;
          console.log(user_id, password);
          this.loginUser(user_id, password);
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

    return(
      <>
        <Router>
          <div className="container">
            <Navbar />
            {/* <Search /> */}
            <br />
            
            {this.state.logged
            ? <Switch>
                <Route path="/thesis" component ={ThesisList} />
                <Route path="/edit/:user_id" component={ThesisEdit} />
                <Route path="/create" component={ThesisCreate} />
                <Route path="/profile" component={UserList} />
                <Route path="/setting/:user_id" component={EditUser} />
                <Route path="/chart" component ={DataVisualisation} />
                <Route path="/logout" component={logout_l} />
                <Route path="/home" component={Home} />
                <Route path="/search" component={Search} />
                {/* <Route component={ErroR} /> */}
              </Switch>
            
            : <Switch>
                <Route path="/login" exact component= {loginn} />
                <Route path="/register" component={CreateUser} />
                <Route path="/home" component={Home} />
              </Switch>
            }
            {/* <Route path="/login" exact component= {Login} /> */}
            <footer id="footer">
              <div className="empty-container" style={{ marginTop: 20 }}></div>
              <div className="container">
                {/* <center>Copyrights from A'in Hazwani Ahmad Rizal</center><br /> */}
                <center>Copyrights from Ahmad Shauqi</center><br />
              </div>
            </footer>
          </div>
        </Router>
    </>
    );
  }
  
}

// onSubmit={(event) => {
//   event.preventDefault();
//   const user_id = event.target.user_id.value;
//   const password = event.target.Password.value;
//   this.loginUser(user_id,password);
  
// }}



export default App;
