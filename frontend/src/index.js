import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
//import Login from './login';



ReactDOM.render(
  <Router basename={process.env.PUBLIC_URL}>
  <React.StrictMode>
    <App />
    
  </React.StrictMode>,
  
  document.getElementById('root')
  </Router>
);

