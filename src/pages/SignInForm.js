import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class SignInForm extends Component {
    constructor() {
        super();

        this.state = {
            username: '',
            password: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        let target = e.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        let name = target.name;

        this.setState({
          [name]: value
        });
    }

    async handleSubmit(e) {
        e.preventDefault();

        console.log('The form was submitted with the following data:');
        console.log(this.state);
        const {data} = await axios.post('http://localhost:3001/login', {...this.state});
        if(data && data.token){
            sessionStorage.setItem('access_token', data.token);
            this.props.history.push('/dashboard');
        }
        console.log('data: ', data);
    }    


    render() {
        return (
        <div className="FormCenters">
          
            <div className="FormField">
                <label className="FormField__Label" htmlFor="uname">UserName</label>
                <input type="text" id="uname" className="FormField__Input" placeholder="Enter your Username" name="username" value={this.state.email} onChange={this.handleChange} />
              </div>

              <div className="FormField">
                <label className="FormField__Label" htmlFor="password">Password</label>
                <input type="password" id="password" className="FormField__Input" placeholder="Enter your password" name="password" value={this.state.password} onChange={this.handleChange} />
              </div>

              <div className="FormField">
                  <button className="FormField__Button mr-20" onClick={(e) => this.handleSubmit(e)}>Sign In</button> 
                  <Link to="/" className="FormField__Link">Create an account</Link>
              </div>
          </div>
        );
    }
}

export default SignInForm;
