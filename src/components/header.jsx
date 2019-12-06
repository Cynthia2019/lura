import React, { Component } from 'react';
import  HeaderImage from '../img/lura.png';
import { Icon } from 'antd'
import './header.css'

export default class CustomHeader extends Component {
    constructor(props){
        super(props)
    }
    render(){
        const props = this.props 
        console.log(props)
        return(
            <div className="container">
                <div className="header-image">
                    <img src={HeaderImage} alt='header-image' style={{width:'35%', height:'80%'}}/>
                </div>
                <div className="sides">
                    <text className="about-us">About Us</text>
                    <text className="starts">Get Started</text>
                    <div className="Box">The Box</div>
                    <Icon type="search" style={{fontSize:'30px', color:'#707070'}}/>
                </div>
            </div>
        )
    }
}
