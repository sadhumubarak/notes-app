import React, { Component } from 'react';
import axios from 'axios';

class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title:'',
            description:'',
            formList: [],
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);     
        }

async handleSubmit() {
    console.log(this.state);
    const data= await axios.post('http://localhost:3001/feed', { ...this.state });
    this.setState({
        title: '',
        description: ''
    })
    this.handleGetFeed();
}

handleChange(e){
    this.setState({
        [e.target.name]: e.target.value
    });

}

async componentWillMount() {
    this.handleGetFeed();
}

async handleGetFeed() {
    const { data } = await axios.get('http://localhost:3001/feed');
    console.log('data: ', data);
    this.setState({
        formList: data,
    })
}
async logout(e) {

        const token = sessionStorage.getItem('access_token');
        console.log('data');
        const { data } = await axios.get('http://localhost:3001/logout', {
            headers: {
                'authorization': `Bearer ${token}`
            }
        });
        
        this.props.history.push('sign-in');
    }

renderFormList() {
    const { formList } = this.state;
    return formList.map(form =>(
        <div className="list">
            <div className="card" >
                <div className="title" >
                    Title: {form.title}</div>
                <div className="desc" >    
                    Description: {form.description}</div>
            </div>
        </div>
    ))
}

    render() {
        return (

            <div className="container">
                <header>
                    <h3>IO DASHBOARD</h3>
                    <button className="btn_lo" onClick={(e) => this.logout(e)}>logout</button>
                </header>
            
                <div class="form">
                    <input type="text" className="t_field" placeholder="Enter your title" name="title" value={this.state.title} onChange={this.handleChange}/>
                    <input type="text" className="t_field" placeholder="Enter your Comments" name="description" value={this.state.description} onChange={this.handleChange}/>
                    <button className="btn_add"> Add </button>
                    {/* <div>
                        <i class='fas fa-edit' onClick={() => this.handleSubmit()}>+</i>
                    </div> */}
                    
                </div>

                <div className="card_container">
                {
                    this.renderFormList()
                }
                </div>
            </div>
    );
    }
}

export default Dashboard;
