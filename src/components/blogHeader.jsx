import React, { Component } from 'react';
import  HeaderImage from '../img/lura.png';
import lineImage from '../img/vickholius-nugroho-jt6QxZwSOCQ-unsplash.jpg'
import { Navbar, Nav }from 'react-bootstrap'
import './blogHeader.css'

export default class BlogHeader extends Component {
    render(){
        return(
            <div>
            <Navbar expand="lg" >
                <Navbar.Brand href="/" style={{width:'65%', display:'flex'}}>
                    <img src={HeaderImage} alt='header' style={{width:'35%', height:'80%'}}/>
                </Navbar.Brand>
            </Navbar>
            <Navbar expand="lg"
            style={{padding: '2% 3%', 
            backgroundImage: `url(${lineImage})`, height:'100px'}}>
                <Navbar.Brand />
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" style={{justifyContent:'center'}}>
                    <Nav className='blog-navs' style={{color:"white"}}>
                        <Nav.Link href='#'>Brand Profiles</Nav.Link>
                        <Nav.Link href='#'>LURA Updates</Nav.Link>
                        <Nav.Link href="#">Fabrics</Nav.Link>
                        <Nav.Link href="#">Build Your brand</Nav.Link>
                        <Nav.Link href="#">Sustainable Practices</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            </div>
        )
    }
}