// import React, { Component } from 'react';
// //import '../../src/Style.css';
// import "bootstrap/dist/css/bootstrap.min.css";
// import axios from 'axios';


// const Thesis = props => (
//     <tr>
//     <td>{props.thesis.user_id}</td>
//     <td>{props.thesis.thesis_title}</td>
//     <td>{props.thesis.thesis_author}</td>
//     <td>{props.thesis.thesis_keyword}</td>
// </tr>
// );

// export default class ThesisSearch extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state ={thesis_keyword: ''};
//         this.handleChange = this.handleChange.bind(this);
//         this.handleSubmit = this.handleSubmit.bind(this); 
//     }
//     handleChange(event) {
//         this.setState({value: event.target.thesis_keyword});
//         event.preventDefault();
//     }
//     handleSubmit(event) {
//         alert('Thesis keyword: ' + this.state.value);
//         event.preventDefault();
//     }
//     thesisSearch(thesis_key) {
//         const Keyword = {
//             thesis_keyword: thesis_key
//         } 
//     axios.get('http://localhost:5000/thesis/search',thesis_key)

//     .then(res => {
//         this.setState({thesis_key: res.data});
//     })
//     }

//     ThesisList() {
//         return this.state.thesis.map(currentThesis => {
//             return <Thesis thesis={currentThesis} key={currentThesis.user_id} />;
//         })
//     }

//     render(){
//         return (
//             <div>
//                 <form onSubmit={this.handleSubmit}>
//                     <div className="form-group">
//                         <label>Search Keyword</label>
//                         <input type="text" 
//                             value={this.state.thesis_keyword}
//                             onChange={this.handleChange}
//                             className="form-control" 
//                             name="search">
//                         </input>
//                     </div>
//                     <button value="Submit" type="submit" className="btn btn-primary">Search</button>
//                 </form>

//                 <h3><center>Search Result</center></h3>
//                 <table className="table table-striped" style={{ marginTop: 100 }}>
//                     <thead>
//                         <tr>
//                             <th>Matric Number</th>
//                             <th>Title</th>
//                             <th>Author</th>
//                             <th>Keyword</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         { this.thesisSearch() }
//                     </tbody>
//                 </table>
                                    
//              </div>

                    
//         )
//     }
// }

import Search from 'antd/lib/input/Search';
import React, { Component } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/thesis/search'


class ThesisSearch extends Component{
    state = {
        query: '',
        results: []
    }

    getInfo = () => {
        axios.get(`${API_URL}&prefix=${this.state.query}`)
        .then(({ data })=> {
            this.setState({
                results: data.data
            })
        })
    }

    handleInputChange = () => {
        this.setState({
            query: this.search.value
        }, ()=>{
            if(this.state.query && this.state.query.length >1) {
                if (this.state.query.length % 2 ===0) {
                    this.getInfo()
                }
            }
        })
    }

    onSubmit = (e) => {

    }

    

    render(){
        return(
            <form>
                <input 
                placeholder="Search Keyword"
                ref={input => this.search = input}
                onChange={this.handleInputChange} />

                <p>{this.state.query}</p>
            </form>
        )
    }
}

export default ThesisSearch;