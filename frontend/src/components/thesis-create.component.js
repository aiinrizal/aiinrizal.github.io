import React, { Component } from 'react';
import axios from 'axios';
//import DatePicker from 'react-datepicker';
//import "react-datepicker/dist/react-datepicker.css";



export default class ThesisCreate extends Component {
    constructor(props) {
    super(props);

    this.onChangeUser_id= this.onChangeUser_id.bind(this);
    this.onChangeThesis_title= this.onChangeThesis_title.bind(this);
    this.onChangeThesis_desciption= this.onChangeThesis_desciption.bind(this);
    this.onChangeThesis_author= this.onChangeThesis_author.bind(this);
    this.onChangeThesis_SV= this.onChangeThesis_SV.bind(this);
    this.onChangeThesis_program= this.onChangeThesis_program.bind(this);
    this.onChangeThesis_faculty= this.onChangeThesis_faculty.bind(this);
    this.onChangeThesis_keyword= this.onChangeThesis_keyword.bind(this);
    this.onSubmit= this.onSubmit.bind(this);

    this.state = {
        user_id: '',
        thesis_title: '',
        thesis_description: '',
        thesis_author: '',
        thesis_SV: '',
        thesis_program: '',
        thesis_faculty: '',
        thesis_keyword: '',
    }}
    onChangeUser_id(e) {
        
        this.setState({ 
            user_id: e.target.value
        });
    }
    onChangeThesis_title(e){
        this.setState({ 
            thesis_title: e.target.value
        });
    }
    onChangeThesis_desciption(e){
        this.setState({ 
            thesis_description: e.target.value
        });
    }
    onChangeThesis_author(e){
        this.setState({ 
            thesis_author: e.target.value
        });
    }
    onChangeThesis_SV(e) {
        this.setState({ 
            thesis_SV: e.target.value
        });
    }
    onChangeThesis_program(e) {
        if (e.target.value === 'Program Name'){
            alert("program name cannot be empty!");
        } else {
        
            this.setState ({ 
            thesis_program: e.target.value
        });
    }
    };
    onChangeThesis_faculty(e){
        this.setState({ 
            thesis_faculty: e.target.value
        });
    }
    onChangeThesis_keyword(e) {
        this.setState({ 
            thesis_keyword: e.target.value
        });
    }

    onSubmit(e) {
    alert('Thesis successfully added');
    e.preventDefault();
    //window.location = '/thesis';

    const newThesis = {
        user_id:this.state.user_id,
        thesis_title: this.state.thesis_title,
        thesis_description: this.state.thesis_description,
        thesis_author: this.state.thesis_author,
        thesis_SV: this.state.thesis_SV,
        thesis_program: this.state.thesis_program,
        thesis_faculty: this.state.thesis_faculty,
        thesis_keyword: this.state.thesis_keyword
    }
    console.log(newThesis);

    axios.post('http://localhost:5000/thesis/add', newThesis)
    .then(res => console.log(res.data));
    

    //window.location = '/'
};

render(){
    return (
<div style={{marginTop: 20}}>
<h3>Add Thesis</h3> 
<form onSubmit={this.onSubmit}>
<div class="form-group"><br />

    <label>Matric Number: </label>
    <input placeholder="Matric Number"
            type="number"
            required
            class="form-control"
            value={this.state.user_id}
            onChange={this.onChangeUser_id}
            /><br />
    <label>Title: </label>
    <input placeholder="Thesis Title"
            type="text"
            required
            class="form-control"
            value={this.state.thesis_title}
            onChange={this.onChangeThesis_title}
            /> <br />
    <label>Description: </label>
    <textarea placeholder="Thesis Abstract"
            class="form-control" rows="5"
            required
            value={this.state.thesis_description}
            onChange={this.onChangeThesis_desciption}
            /> <br />       
    <label>Author: </label>
    <input placeholder="Thesis Author"
            type="text"
            required
            class="form-control"
            value={this.state.thesis_author}
            onChange={this.onChangeThesis_author}
            /><br />
    <label>Supervisor: </label>
    <input placeholder="Supervisor Name"
            type="text"
            required
            class="form-control"
            value={this.state.thesis_SV}
            onChange={this.onChangeThesis_SV}
            /><br />
    <label>Program: </label><br />
    <select value={this.state.ThesisProgram}        
            onChange={this.onChangeThesis_program}
            class="form-control"
    ><br />
            <option value="Program Name">Program Name</option>
            <option value="Bachelor of Qiraat Studies with Honours">Bachelor of Qiraat Studies with Honours</option>
            <option value="Bachelor of Quranic and Sunnah Studies with Honours">Bachelor of Quranic and Sunnah Studies with Honours</option>
            <option value="Bachelor of Quranic Studies with Multimedia with Honours">Bachelor of Quranic Studies with Multimedia with Honours</option>
            <option value="Bachelor of Sunnah Studies with Information Management with Honours">Bachelor of Sunnah Studies with Information Management with Honours</option>
            <option value="Bachelor of Fiqh and Fatwa with Honours">Bachelor of Fiqh and Fatwa with Honours</option>
            <option value="Bachelor of Law and Shariah with Honours">Bachelor of Law and Shariah with Honours</option>
            <option value="Bachelor of Shariah (Halal Industry) with Honours">Bachelor of Shariah (Halal Industry) with Honours</option>
            <option value="Bachelor of Akidah and Religion Studies with Honours">Bachelor of Akidah and Religion Studies with Honours</option>
            <option value="Bachelor of Communication with Honours">Bachelor of Communication with Honours</option>
            <option value="Bachelor of Counseling with Honours">Bachelor of Counseling with Honours</option>
            <option value="Bachelor of Da'wah and Islamic Management with Honours">Bachelor of Da'wah and Islamic Management with Honours</option>
            <option value="Bachelor of New Media Communication with Honours">Bachelor of New Media Communication with Honours</option>
            <option value="Bachelor of Accounting with Honours">Bachelor of Accounting with Honours</option>
            <option value="Bachelor of Corporate Administration and Relations with Honours">Bachelor of Corporate Administration and Relations with Honours</option>
            <option value="Bachelor of Islamic Banking and Finance with Honours">Bachelor of Islamic Banking and Finance with Honours</option>
            <option value="Bachelor of Marketing (Financial Services) with Honours">Bachelor of Marketing (Financial Services) with Honours</option>
            <option value="Bachelor of Muamalat Administrations with Honours">Bachelor of Muamalat Administrations with Honours</option>
            <option value="Bachelor of Computer Science with Honours (Information Security and Assurance)">Bachelor of Computer Science with Honours (Information Security and Assurance)</option>
            <option value="Bachelor of Science with Honours (Actuarial Science and Risk Management)">Bachelor of Science with Honours (Actuarial Science and Risk Management)</option>
            <option value="Bachelor of Science with Honours (Applied Physics)">Bachelor of Science with Honours (Applied Physics)</option>
            <option value="Bachelor of Science with Honours (Financial Mathematics">Bachelor of Science with Honours (Financial Mathematics)</option>
            <option value="Bachelor of Science with Honours (Food Biotechnology)">Bachelor of Science with Honours (Food Biotechnology)</option>
            <option value="Bachelor of Science with Honours (Industrial Chemical Technology)">Bachelor of Science with Honours (Industrial Chemical Technology)</option>
            <option value="Bachelor of Medicine and Surgery (MBBS)">Bachelor of Medicine and Surgery (MBBS)</option>
            <option value="Bachelor of Arabic and Communication with Honours">Bachelor of Arabic and Communication with Honours	</option>
            <option value="Bachelor of Arabic Language and Islamic Literature with Honours">Bachelor of Arabic Language and Islamic Literature with Honours</option>
            <option value="Bachelor of Education (Islamic Education) with Honours">Bachelor of Education (Islamic Education) with Honours</option>
            <option value="Bachelor of English Language with Commerce (Honours)">Bachelor of English Language with Commerce (Honours)</option>
            <option value="Bachelor of Dental Surgery (BDS)">Bachelor of Dental Surgery (BDS)</option>
            <option value="Bachelor of Electrical Engineering with Honours">Bachelor of Electrical Engineering with Honours</option>
            <option value="Bachelor of Electronic Engineering with Honours">Bachelor of Electronic Engineering with Honours</option>
            <option value="Bachelor of Science in Architecture with Honours">Bachelor of Science in Architecture with Honours</option>
    </select> <br />
    <label>Faculty: </label><br />
    <select 
            value={this.state.ThesisFaculty} 
            onChange={this.onChangeThesis_faculty}
            class="form-control"
    >
    <option value="default">Faculty Name</option>
    <option value="Faculty of Science & Technology">Faculty of Science & Technology</option>
    <option value="Faculty of Quran & Sunnah Studies">Faculty of Quran & Sunnah Studies</option>
    <option value="Faculty of Syariah & Law">Faculty of Syariah & Law</option>
    <option value="Faculty of Leadership & Management">Faculty of Leadership & Management</option>
    <option value="Faculty of Economics & Mualamat">Faculty of Economics & Mualamat</option>
    <option value="Faculty of Medicine & Health Sciences">Faculty of Medicine & Health Sciences</option>
    <option value="Faculty of Major Language Studies">Faculty of Major Language Studies</option>
    <option value="Faculty of Dentistry">Faculty of Dentistry</option>
    <option value="Faculty of Engineering & Built Environment">Faculty of Engineering & Built Environment</option>
    </select> <br />   
    <label>Keyword: </label>
    <input  placeholder="Keyword"
            type="text"
            required
            class="form-control"
            value={this.state.thesis_keyword}
            onChange={this.onChangeThesis_keyword}
            /><br />     
    <div className="form-group">
        <center>
        <input type="submit" value="Confirm" className="btn btn-primary" />
        </center>
    </div>      
        </div>
    </form>
</div>

    )
    }}
