import React, { Component, useState } from 'react';
import axios from 'axios';
import { message } from 'antd';
import swal from 'sweetalert';
//import {ReactPasswordStrength} from 'react-password-strength';
import PasswordStregthMeter from './PasswordStrengthMeter';

export default class CreateUser extends Component {
    constructor(props) {
        super(props);

        this.onChangeUser_id = this.onChangeUser_id.bind(this);
        this.onChangeFullname = this.onChangeFullname.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePass = this.onChangePass.bind(this);
        this.onChangeRole = this.onChangeRole.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            user_id: '',
            fullname: '',
            email: '',
            password: '',
            role: '',
        }
    }

    

    onChangeUser_id(e) {
        this.setState({
            user_id: e.target.value
        });
    }

    onChangeFullname(e) {
        this.setState({
            fullname: e.target.value
        });
    }

    onChangeEmail(e) {
            
        this.setState({
            email: e.target.value
            
        });
    }

    onChangePass(e) {
        
        this.setState({
            password: e.target.value
        });
    }

    onChangeRole(e){
        this.setState({
            role: e.target.value
        });
    }

    onSubmit(e){
        //alert('User is successfully added');
        e.preventDefault();

        const NewUser = {
            user_id:this.state.user_id,
            fullname: this.state.fullname,
            email: this.state.email,
            password: this.state.password,
            role: this.state.role
            
        }

        
        axios.post('http://localhost:5000/users/register', NewUser)
        .then(res => {
            if (res.data === 'User added!'){
                swal("Registration Complete", "You are now ThesisQ member", "success");
                // window.location = '/login';
            }

            else if (res.data.status === 'email_error'){
                swal("Wrong Email",res.data.message, "warning");
            }

            else if (res.data.status === 'Student_warning'){
                swal("Wrong Email",res.data.message, "warning");
            }

            else if (res.data.status === 'Admin_warning'){
                swal("Wrong Email",res.data.message, "warning");
            }

            else if (res.data.status === 'Password_error'){
                swal("Password Complexity", res.data.message, "warning");
            }
            
            else {
                swal("Oppss","Something is not okay, try again", "error");
            
               
            }

            //console.log(res.data.status);
            
            // if (res.data.status === "official"){
            //     swal("Good job!", "You clicked the button!", "success");
            // }
            
        });
        
    }
    
render(){
    
    return (
        <div style={{marginTop: 20}}>
        <h3><center>Register Now!</center></h3> 
        <form onSubmit={this.onSubmit}>
            <div className="form-group"><br />

                <label>Staff ID or Student Matric: </label>
                <input placeholder="ID Number"
                        type="number"
                        className="form-control"
                        value={this.state.user_id}
                        onChange={this.onChangeUser_id}
                        /><br />
                       

                <label>Full Name: </label>
                <input placeholder="Full Name"
                        type="text"
                        required
                        className="form-control"
                        value={this.state.fullname}
                        onChange={this.onChangeFullname}
                        /> <br />    

                <label>Email: </label>
                <input placeholder="Please Use USIM Official Email"
                        type="email"
                        required
                        className="form-control"
                        value={this.state.email}
                        onChange={this.onChangeEmail}
                        /><br />

                
                <label>Password: </label>
                <div className="form-group mb-1"> 
                    <input placeholder="Please Use A Complex Password"
                        type="password"
                        required
                        className="form-control shadow-none"
                        value={this.state.password}
                        onChange={this.onChangePass}
                        //
                    />
                </div>
                {/* <PasswordStregthMeter /> */}
                <br />
                    <label>Role: </label><br />
                        <select value={this.state.role} 
                                
                                onChange={this.onChangeRole}
                                className="form-control"
                        ><br />
                        <option value="Role">Role</option>
                        <option value="Student">Student</option>
                        <option value="Admin">Admin</option>
                        </select> <br />

                <div className="form-group">
                            <center>
                            <input type="submit" value="Confirm" className="btn btn-primary" />
                            </center>
                        </div>
                    </div>
                </form>
            </div>
    )
}
}