import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


const Thesis = props => (
    <tr>
        <td>{props.thesis.user_id}</td>
        <td>{props.thesis.thesis_title}</td>
        <td>{props.thesis.thesis_author}</td>
        <td><Link to={"/edit/"+props.thesis._id}>Edit</Link> | <a href="#" onClick={() => {props.deleteThesis(props.thesis._id)}}>Delete</a>
            </td>
    </tr>
);

export default class ThesisList extends Component {

    constructor (props) {
        super(props);

        this.deleteThesis = this.deleteThesis.bind(this);
        this.state ={
            thesis: []
        };
    }

componentDidMount() {
    axios.get('http://localhost:5000/thesis/')
    .then(response => {
        this.setState({thesis: response.data});
    })
    .catch(function(error){
        console.log(error);
    })
}

componentDidUpdate(){
    axios.get('http://localhost:5000/thesis/')
    .then(response => {
        this.setState({thesis: response.data});
    })
    .catch(function(error){
        console.log(error);
    })
}

deleteThesis (user_id) {
    axios.delete(`http://localhost:5000/thesis/${user_id}`)   
    .then(res => console.log(res.data));
    this.setState({
        thesis: this.state.thesis.filter(el => el.user_id !== user_id)
    })
    console.log("deleting "+user_id)
}

ThesisList() {
    return this.state.thesis.map(currentThesis => {
        return <Thesis thesis={currentThesis} deleteThesis={this.deleteThesis} key={currentThesis.user_id} />;
    })
}

handleChange = event => {
    this.setState({ filter: event.target.value });
};

generatePDF(element) {
    var restorepage = document.body.innerHTML;
    var printcontent = document.getElementById(element).innerHTML;

    document.body.innerHTML = printcontent;
    window.print();
    document.body.innerHTML = restorepage;


}

render(){ 
    return (
        <div>
            <button onClick={() => {
                this.generatePDF('ThesisList')
            }} type="button" class="btn btn-info text-right">Generate Report</button>
            <div id="ThesisList">
                            <h3><center>Thesis Management System</center></h3>
                <table className="table table-striped" style={{ marginTop: 20 }}>
                    <thead>
                        <tr>
                            <th>Matric Number</th>
                            <th>Title</th>
                            <th>Author</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.ThesisList() }
                    </tbody>
                </table>
            </div> 
        </div>
    );
}
}

