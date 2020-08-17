import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Divider } from 'antd'
import API from '../utils/API'
import { Switch, Redirect } from 'react-router-dom';
import './signupPage.css'
import {PageView, initGA} from '../components/Tracking';
import { Event } from "../components/Tracking";

const config = {
    headers: {
        "Access-Control-Allow-Origin": "*",
        'Content-Type': 'application/json'
    }
}

export default class SignUpPage extends React.Component {
    constructor(props){
        super(props)
        this.firstname = React.createRef();
        this.lastname = React.createRef();
        this.apparel = React.createRef();
        this.employees = React.createRef();
        this.produced = React.createRef();
        this.state = {
            redirect: false,
            email: null, 
            id: null
        }
    }
    readURL = () =>{
        var url = window.location.search
        console.log(url.substring(1))
        var parts = url.substring(1).split('&')
        var email = parts[0].split('=')[1].replace('%40','@').replace('%7C','|')
        this.setState({email:email, id:parts[1].split('=')[1]})
    }
    componentWillMount = () =>{
        initGA('UA-171248811-1');
        PageView();
        this.readURL()
    }
    handleClick = (e) => {
        e.preventDefault();
        if(this.firstname.current.value && this.lastname.current.value &&
            this.apparel.current.value && this.employees.current.value){
            this.userRegister()
            Event("SIGNUP", 'user sign up', "signup page")
        } else {
            alert('Please fill the required fields.')
        }
    }
    userRegister = () => {
        console.log(this.state.id)
        API.post('/register',{
            id: this.state.id, 
            username: this.state.email,
            firstName: this.firstname.current.value,
            lastName: this.lastname.current.value, 
            apparel: this.apparel.current.value, 
            employees: this.employees.current.value, 
            produced: this.produced.current.value
        }, config)
        .then(res => {if(res.status===201){
            alert("Sign up successfully!")
            this.setRedirect()
        }})
        .catch(err => {
            if(err.response){
                if(err.response.status==='400'){
                    alert("Please fill in the required fields.")
                } else if (err.response.status==='500'){
                    alert('Server Error. Please try again later.')
                }
            } else {
                alert(err.message)
            }
        })
    }
    setRedirect = () => {
        this.setState({redirect: true})
    }
    renderRedirect = () =>{
        if(this.state.redirect){
            return (
                <Switch>
                    <Redirect from='/signup' to='/email-verification'/>
                </Switch>
            )
        }
    }
    render(){
        return(
            <div style={{display:'flex', justifyContent:'center', backgroundColor:'#fbf6f2', padding:'40px 0',minHeight:'100vh'}}>
                {this.renderRedirect()}
                <Form className="signup-form" style={{textAlign:'left', backgroundColor:'white',
                boxShadow:'rgba(0, 0, 0, 0.1) 0px 0px 20px 5px', padding:'30px 60px'}}>
                    <Form.Text style={{fontSize:'30px'}}>Sign Up</Form.Text>
                    <Divider style={{border:'2px solid rgba(0,0,0,0.25)', margin:'30px 0'}}/>
                    <Row>
                        <Col md={6}>
                            <Form.Group>
                                <Form.Label className='signup-input'>First Name</Form.Label>
                                <Form.Control placeholder="first name" ref={this.firstname} required ></Form.Control>
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group>
                                <Form.Label className='signup-input'>Last Name</Form.Label>
                                <Form.Control placeholder="last name" ref={this.lastname} required ></Form.Control>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Form.Text style={{fontSize:'25px'}}>Additional Questions</Form.Text>
                    <Form.Group>
                        <Form.Label className='signup-input'>1) Are you an apparel brand?</Form.Label>
                        <Form.Control as='select' ref={this.apparel} required >
                            <option>  </option>
                            <option>Yes</option>
                            <option>No</option>
                        </Form.Control>
                        <Form.Label className='signup-input'>2) How many employees do you have?</Form.Label>
                        <Form.Control as='select' ref={this.employees} required>
                            <option>  </option>
                            <option>1-5</option>
                            <option>5-10</option>
                            <option>10+</option>
                        </Form.Control>
                        <Form.Label>3) How many pieces do you produce in a collection?</Form.Label>
                        <Form.Control as='textarea' ref={this.produced} rows='1'>
                        </Form.Control>
                    </Form.Group>
                    <Form.Row style={{justifyContent:'center'}}>
                        <Button className='btn-darkgreen' type="submit" onClick={this.handleClick}>
                                Register
                        </Button>
                    </Form.Row>
                    </Form>
            </div>
        )
    }
}
