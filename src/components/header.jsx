import React, { Component } from 'react';
import  HeaderImage from '../img/lura.png';
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import Button from 'react-bootstrap/Button'
import { SearchOutlined, CloseOutlined } from '@ant-design/icons';
import './header.css'
import { Navbar, Nav }from 'react-bootstrap'
import API from '../utils/API'

export default class CustomHeader extends Component {
    constructor(){
        super()
        this.state = {
            user: false,
            search: false
        }
    }
    handleSearch = () => {
        this.setState({search:true})
    }
    getUserFromDB = () => {
        API.get('/user', {withCredentials: true,})
        .then(res=>{
            console.log(res.data)
            if(res.data.username) {
                this.setState({user:true})
            } 
        }).catch(err=>console.log(err))
    }
    componentDidMount = () => {
        this.getUserFromDB()
    }
    render(){
        return (
            <Navbar bg="light" expand="lg" style={{padding: '2% 3%'}} fixed="top">
            <Navbar.Brand href="/" style={{width:'40%', display:'flex'}}>
                <img src={HeaderImage} alt='header' style={{width:'35%', height:'80%'}}/>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" style={{justifyContent:'flex-end'}}>
                    <Nav className='header-navs'>
                        {/*<Nav.Link href='/shop'>Shop</Nav.Link>
                        <Nav.Link href="/manufactures">Manufactures</Nav.Link>*/}
                        {this.state.user?<Nav.Link href='/account'>My Account</Nav.Link>:<></>}
                        {/*<Nav.Link href='/fabric-finder'>Fabric Consultation</Nav.Link>*/}
                        <Nav.Link href='/blog'>Blog</Nav.Link>
                        <Nav.Link href='https://lura-services.herokuapp.com/login'>Log In</Nav.Link>
                        <Nav.Link href='https://lura-services.herokuapp.com/register'>Sign Up</Nav.Link>
                        <Nav.Item onClick={this.handleSearch}>
                            <SearchOutlined style={this.state.search?{fontSize:0,transition:'0.5s',position:'absolute'}:{}}/>
                        </Nav.Item>
                        <InputGroup  style={this.state.search?{width:'20vw',transition:'0.5s',right:'0',bottom:0,height:'40px'}:{width:0}}  className='search-bar'>   
                                    <Form.Control placeholder='search...'/>
                                <InputGroup.Append style={{display:'block'}}>
                                    <Button variant='success'>Go</Button>
                                    <CloseOutlined onClick={()=>{this.setState({search:false})}} style={{padding:'5px'}}/>
                                </InputGroup.Append>
                        </InputGroup>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

