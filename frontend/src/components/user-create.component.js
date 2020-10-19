import React, { Component } from 'react';
import axios from 'axios';



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

        console.log(NewUser);
        axios.post('http://localhost:5000/users/register', NewUser)
        .then(res => {
            if (res.data === 'User added!'){
                alert(res.data)
                window.location = '/login';
            }

            else {
               // alert(res.data)
              if(res.data.slice(0,5)=== 'Mongo'){
                alert("This matric number has been registered here")
              }
            
               
            }
            
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
                <input placeholder="Please Use A Complex Password"
                        type="password"
                        required
                        className="form-control"
                        value={this.state.password}
                        onChange={this.onChangePass}
                        /><br />

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