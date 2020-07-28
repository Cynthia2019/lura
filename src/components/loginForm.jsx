import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import API from '../utils/API'
import {PageView, initGA} from './Tracking';
import { Event } from "./Tracking";
import ReactGA from "react-ga";
import './header.css'

const config = {
    headers: {
        "Access-Control-Allow-Origin": "https://localhost:3000",
        'Content-Type': 'application/json'
    },
    withCredentials:true
}

export default class LoginPage extends React.Component {
    constructor(props){
        super(props)
        this.username = React.createRef()
        this.password = React.createRef()
    }
   parseJwt = (token) => {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
    
        return JSON.parse(jsonPayload);
    };
    componentDidMount = () => {
        initGA('UA-171248811-1');
        PageView();
    }
    handleClick=(e)=>{
        e.preventDefault();
        this.userLogin();
    }
    async userLogin() {
        var result;
        await API.post('/authenticate/login', {
                username: this.username.current.value, 
                password: this.password.current.value
            }, config)
            .then((res) => {
                result = this.parseJwt(res.data.accessToken) 
                alert('Login Successfully')
                Event("LOGIN", 'user login', "login page")
                this.setRedirect()
            })
            .catch(err => {
                if(err.response){
                    if(err.response.status === "403"){
                        alert('User already logged in')
                        this.setRedirect()
                    } else if(err.response.status === '401'){
                        alert('Invalid username or password')
                    } else if(err.response.status === "400"){
                        alert("Server error, please check your network connection")
                    }
                } else {
                    console.log(err)
                }
            })
            ReactGA('set', 'userId',result.username);// Set the user ID using signed-in user_id.
    }
    render(){

        return(
            <div>
                <Form style={{textAlign:'left', padding:'5%',}}>
                    <Form.Group>
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" ref={this.username}/>
                        <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" ref={this.password} style={{backgroundColor:'#F5EBE9',boxShadow:"3px 3px 8px 1px rgba(0,0,0,0.16)"}}/>
                    </Form.Group>
                <div style={{display:'flex', justifyContent:'center',marginTop:'30px',flexDirection:'column',alignItems:'center'}}>
                    <Button type='submit' className='btn-darkgreen' onClick={this.handleClick}>Login</Button>
                    <div style={{color:'#958A8A', marginTop:'30px'}}>Don't have an account?</div>
                    <Button href='/signup' style={{margin:'0 10px',textAlign:"center"}} className='btn-darkgreen'>Register</Button>
                </div>
                </Form>
        </div>
        )
    }
}
