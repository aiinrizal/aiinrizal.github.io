import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from './navbar.component';
import ChartsEmbedSDK from '@mongodb-js/charts-embed-dom';
// import "bootstrap/dist/css/bootstrap.min.css";
// import './App.css';

const sdk = new ChartsEmbedSDK({
    baseUrl:'https://charts.mongodb.com/charts-project-0-ytsoq'
  });
  
  const chart = sdk.createChart({ chartId: '3ada77e3-cdc9-4355-b0c8-36afd5dba93b' }); 
  
export default class DataVisualisation extends Component {
    render(){
        //chart.render(document.getElementById('app'));
        return(
            <centre><h3>Data Visualisation</h3></centre>
        )
    }
}