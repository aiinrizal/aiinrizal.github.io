import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const User = props => (
    <tr>
        <td>{props.user.user_id}</td>
        <td>{props.user.fullname}</td>
        <td>{props.user.email}</td>
        <td>{props.user.role}</td>
        <td>
            <Link to={"/setting/"+props.user.user_id}>Edit</Link>
        | <a href="#" onClick={() => {props.deleteUser(props.user.user_id)}}>Delete</a>
        </td>

    </tr>
);

export default class UserList extends Component {
    constructor (props) {
        super(props);

        this.deleteUser = this.deleteUser.bind(this);
        this.state ={user: []};
    }

    componentDidMount(){
        axios.get('http://localhost:5000/users/')
        .then(response => {
            this.setState({user: response.data});

        })
        .catch(function(error){
            console.log(error);
        })
    }

    componentDidUpdate(){
        axios.get('http://localhost:5000/users/')
        .then(response => {
            this.setState({user: response.data});
        })
        .catch(function(error){
            console.log(error);
        })
    }

    deleteUser(user_id) {
        axios.delete("http://localhost:5000/users/"+user_id)
        .then(res => console.log(res.data));

        this.setState({
            user: this.state.user.filter(el => el.user_id !== user_id)
        })
    }

    UserList() {
        return this.state.user.map(currentUser => {
            return <User user={currentUser} deleteUser={this.deleteUser} key={currentUser.user_id} />;
        })
    }

    render() {
        return (
            <div>
                <h3><center>Registered User</center></h3>
                <table className="table table-striped" style={{ marginTop: 20 }}>
                    <thead>
                        <tr>
                            <th>User ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.UserList() }
                    </tbody>
                </table>
            </div>
        )
    }
}