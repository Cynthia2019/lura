import React, { Component } from 'react';
import CustomHeader from '../components/header'
import CustomFooter from '../components/footer'
import lineImage from '../img/vickholius-nugroho-jt6QxZwSOCQ-unsplash.jpg'
import MainContent from '../components/mainContent'
import video_offical from '../video/LURAvideo.mp4'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import './main.css'
import {PageView, initGA} from '../components/Tracking';
import { Event } from "../components/Tracking";


export default class MainPage extends Component {
    constructor(){
        super()
        this.state = {
            display: false, 
            autoplay: false,
        }
    }
    componentDidMount() {
        initGA('UA-171248811-1');
        PageView();
     }  
    handleScroll=(e)=>{
        console.log(window.scrollY)
        if(window.scrollY>50){
            this.setState({display:false, autoplay: true})
        }else {
            this.setState({display:true})
        }
    }
    render(){
        window.addEventListener('scroll', this.handleScroll);
        return(
            <div >
                <CustomHeader/>
                <div className="main-container" style={{position:'relative'}}>
                <div className="line-image" style={LineImage}>
                    <img src={lineImage} alt='leaves' style={{width:'100%'}}></img>
                </div>
                <div className="content" style={{position:'relative', top:'100px'}}>
                <div className="main-text" style={{position:'relative', display:'flex', justifyContent:'center'}} >
                    <p 
                    style={{ color:'#357F59', width:'63%', position:'fixed', zIndex:-1,fontWeight:100}}>
                        YOUR ONE-STOP SHOP TO SOURCE AND ORDER SUSTAINABLE TEXTILES </p>
                </div>
                <Row style={videoSection}>
                    <Col md={7}>
                    <div className="video-container" >
                        <video id='displayingVideo' loop style={video} autoPlay controls onPlay={()=>{Event("video_play", "video auto play starts", 'main page')}}>
                            <source src={video_offical} type='video/mp4'/>
                            Your browser does not support the video tag.
                        </video>
                    </div>
                    </Col>
                    <Col md={5}>
                        <div className="storyBoard">
                            <div className="story-title" style={{fontWeight:'bold', fontSize:'30px'}}>WHAT'S COMING</div>
                            <p style={{padding:'0 20px', fontSize:'20px'}}>We’re working modernising the fashion industry by 
                            digitising the relationship between brands and manufacturers. 
                            Stay updated to rebuild your supply chain in the most sustainable way.</p>
                        </div>
                    </Col>

                </Row>
                <MainContent />
                <CustomFooter />
                </div>
                </div>
            </div>
        )
    }
}


const LineImage = {
    width: '100vw', 
    height: '100px',
    overflow: 'hidden' ,
    position: 'fixed', 
    zIndex: -1, 
}


const videoSection = {
    height: '500px', 
    backgroundColor: '#fbf6f2',
    alignItems:'center'
}

const video = {
    width: '80%', 
    boxShadow: '0 0 50px 0 rgba(0,0,0,0.35)',
    borderRadius: '6px',
    backgroundColor:'#F8F8F8'
}