import React, { Component } from 'react';
import CustomHeader from '../components/header'
import CustomFooter from '../components/footer'
import lineImage from '../img/vickholius-nugroho-jt6QxZwSOCQ-unsplash.jpg'
import MainContent from '../components/mainContent'
import Image2 from '../img/sharon-mccutcheon-Th_WZMUPnO4-unsplash.jpg'
import Image5 from '../img/actionvance-UvisJMJmqAU-unsplash.jpg'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import './main.css'
import {PageView, initGA} from '../components/Tracking';
import { Event } from "../components/Tracking";


export default class MainPage2 extends Component {
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
                <div className="main-container" style={{position:'relative',top:'100px'}}>
                    <div className="main-text" style={{position:'fixed', display:'flex', justifyContent:'center',backgroundImage:`url(${lineImage})`,width:'100vw'}} >
                        <p style={{color:'white', width:'63%', position:'fixed', zIndex:-1,fontWeight:400}}>
                            YOUR ONE-STOP SHOP TO SOURCE AND ORDER SUSTAINABLE TEXTILES </p>
                        <Button className='btn-get-start' style={{boxShadow:'3px 3px 3px 3px rgba(0,0,0,0.125)', 
                        height:'fit-content',bottom:'50%', position:'fixed', zIndex:-1}} href='#getStarted'>GET STARTED</Button>
                    </div>
                    <div style={{position:'relative',top:'60vh'}}>
                        <div className='content-container'>
                        <Row style={{padding:'40px', marginTop:'10vh',justifyContent:'center'}}>
                            <p style={{fontSize:'40px'}}>HOW TO USE</p>
                        </Row>
                        <Row  style={{margin:'10vh 0'}}>
                            <div style={{position:'relative',left:'5vh'}}>
                                <img src={Image2} alt=''style={{transform:'matrix(0,1,-1,0,0,0)',width:'40vw'}}/>
                            </div>
                            <div style={{position:'absolute',left:'15vw'}}>
                                <div className="step1" style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:'5px 20px',backgroundColor:'white',width:'40vw'}}>
                                    <text style={{fontSize:'25px'}}>STEP 1:</text>
                                    <p>FIND YOUR PERFECT FABRIC BY:</p>
                                    <p style={{fontWeight:400}}>(1) Browsing the shop- narrow down through filters!</p>
                                    <p style={{fontWeight:400}}>(2) Using the Virtual consultation tab- a quiz that accounts for the hand-feel  + more of what you’re looking for and matches you with the best fabrics for your needs. </p>
                                </div>
                            </div>
                            <div style={{position:'absolute',right:'10vw',zIndex:1}}>
                                <div className="step2" style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:'5px 20px',backgroundColor:'white',width:'30vw'}}>
                                    <text style={{fontSize:'25px'}}>STEP 2:</text>
                                    <p style={{fontWeight:400}}>Order swatches first, or simply place your full order through our platform.  Our transparency and clear photos allows for no-stress, full certainty sourcing.</p>
                                </div>
                            </div>
                            <div style={{position:'absolute',right:'3vw'}}>
                                <img src={Image5} alt=''style={{transform:'matrix(0,1,-1,0,0,0)',width:'30vw'}}/>
                            </div>
                            <div style={{position:'absolute',left:'50vw',bottom:'40vh'}}>
                                <div className="step3" style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:'5px 20px',backgroundColor:'white',width:'35vw'}}>
                                    <text style={{fontSize:'25px'}}>STEP 3:</text>
                                    <p style={{fontWeight:400}}>The fabric you ordered is on its way to you or your Manufacturer; get ready to bring your designs to life! Simplify your sourcing process with the ease of our service.</p>
                                </div>
                            </div>
                        </Row>
                        <Row className='get-started' style={{justifyContent:'center',margin:'10vh'}}>
                            <div className="get-started-card" style={{backgroundColor:'white',width:'80%'}} id='getStarted'>
                                <Row style={{padding:'20px',justifyContent:'center'}}>
                                    <h1 style={{fontWeight:100}}>LET’S GET STARTED</h1>
                                </Row>
                                <Row style={{margin:'20px'}}>
                                    <Col md={4}>
                                        <p>HAVE A DESIGN IN MIND AND NEED A FABRIC?</p>
                                        <Button className='btn-darkgreen' href='/fabric-finder'>START CONSULTATION</Button>
                                    </Col>
                                    <Col md={4}>
                                        <h1><strong>OR</strong></h1>
                                    </Col>
                                    <Col md={4}>
                                        <p>KNOW YOUR FABRIC AND WANT TO LOOK AROUND?</p>
                                        <Button className='btn-darkgreen'href='/shop'>START SHOPPING</Button>
                                    </Col>
                                </Row>
                            </div>
                        </Row>
                        </div>
                    </div>
                    <div style={{position:'relative',top:'60vh'}}>
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