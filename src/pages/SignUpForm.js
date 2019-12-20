import React, { Component, Fragment } from 'react';
import { Link ,NavLink} from 'react-router-dom';
import axios from 'axios';

class SignUpForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            nuserName: '',
            password: '',
            hasAgreed: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        let target = e.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        let name = target.name;
        console.log('handlechange:' ,value, name);
        this.setState({
          [name]: value
        });
    }

    async handleSubmit(e) {
        e.preventDefault();
        console.log(this.state);
        const data = await axios.post('http://localhost:3001/user', { ...this.state});
        console.log('data:', data);
        this.props.history.push('/sign-in')
    }

    renderSignUpForm() {
        return (
          <div className="App__Form">
          <div className="PageSwitcher">
              <NavLink to="/sign-in" activeClassName="PageSwitcher__Item--Active" className="PageSwitcher__Item">Sign In</NavLink>
              <NavLink exact to="/" activeClassName="PageSwitcher__Item--Active" className="PageSwitcher__Item">Sign Up</NavLink>
            </div>

            <div className="FormTitle">
                <NavLink to="/sign-in" activeClassName="FormTitle__Link--Active" className="FormTitle__Link">Sign In</NavLink> or <NavLink exact to="/" activeClassName="FormTitle__Link--Active" className="FormTitle__Link">Sign Up</NavLink>
            </div>
        <div className="FormCenter">
            <form onSubmit={this.handleSubmit} className="FormFields">
              <div className="FormField">
                <label className="FormField__Label" htmlFor="fname">First Name</label>
                <input type="text" id="Fname" className="FormField__Input" placeholder="Enter your first name" name="firstName" value={this.state.fname} onChange={this.handleChange} />
              </div>
              
              <div className="FormField">
                <label className="FormField__Label" htmlFor="lname">Last Name</label>
                <input type="text" id="Lname" className="FormField__Input" placeholder="Enter your last name" name="lastName" value={this.state.lname} onChange={this.handleChange} />
              </div>

              <div className="FormField">
                <label className="FormField__Label" htmlFor="mobileno">Mobile No</label>
                <input type="text" id="mno" className="FormField__Input" placeholder="Enter your MobileNo" name="mobileNo" value={this.state.mno} onChange={this.handleChange} />
              </div>

              <div className="FormField">
                <label className="FormField__Label" htmlFor="email">E-mail</label>
                <input type="text" id="email" className="FormField__Input" placeholder="sample@mail.com" name="email" value={this.state.mail} onChange={this.handleChange} />
              </div>

              <div className="FormField">
                <label className="FormField__Label" htmlFor="uname">User Name</label>
                <input type="text" id="uname" className="FormField__Input" placeholder="Enter your User name" name="userName" value={this.state.uname} onChange={this.handleChange} />
              </div>

              <div className="FormField">
                <label className="FormField__Label" htmlFor="password">Password</label>
                <input type="password" id="name" className="FormField__Input" placeholder="Enter your password" name="password" value={this.state.password} onChange={this.handleChange} />
              </div>

              <div className="FormField">
                  <button className="FormField__Button mr-20" onClick={this.handleSubmit}>Sign Up</button> <Link to="/sign-in" className="FormField__Link">I'm already member</Link>
              </div>
             </form>
          </div>
          </div>
          
        );
    }

    render(){
      return(
        <Fragment>
          {
            this.renderSignUpForm()
          }
        </Fragment>  
      );
    }
}

export default SignUpForm;
