import React, { useState } from 'react'
import CustomHeader from '../../components/header'
import Form from 'react-bootstrap/Form'
import Carousel from 'react-bootstrap/Carousel'
import Button from 'react-bootstrap/Button'
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup'
import ToggleButton from 'react-bootstrap/ToggleButton'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Modal from 'react-bootstrap/Modal'
import background from '../../img/NAMIHOFFMAN_112419FABRIC-15.png'
import stiff from '../../img/stiff.png'
import stretchy from '../../img/stretchy2.png'
import silky from '../../img/silky.png'
import comfy from '../../img/comfy.png'
import airy from '../../img/airy.png'
import * as Constants from '../constants'
import './quiz.css'
import { Switch, Redirect } from 'react-router-dom'
import axios from 'axios'

const designs = Constants.designs
const bodies = Constants.bodies
const fits = Constants.fits
const detailings = Constants.detailings
const sheernesses = Constants.sheernesses
export default class QuizPage extends React.Component { 
    constructor(){
        super()
        this.title = React.createRef()
        this.state={
            index:0,
            indices: new Array(8).fill(0),
            redirect:false,
            show:false,
            answers: {
                designs:[],
                fit:'',
                weight:'',
                details:[],
                sheerness:''
            }
        }
    }
    handleNextClick = () => {
        console.log(this.state.index)
        var newInd = this.state.index + 1
        var indices = new Array(8).fill(0)
        for (var i = 0; i<newInd-1; i++){
            indices[i] = 1
        }
        this.setState({indices:indices, index:newInd})
    }
    handleBackClick = () => {
        console.log(this.state.index)
        var newInd = this.state.index - 1
        var indices = new Array(8).fill(0)
        for (var i = 0; i<newInd-1; i++){
            indices[i] = 1
        }
        this.setState({indices:indices, index:newInd})
    }
    renderRedirect = () =>{
        if(this.state.redirect){
            return(
                <Switch>
                    <Redirect from='/fabric-finder' to='/account'/>
                </Switch>          
            )
        }
    }
    handleAnsChange = (value, category) => {
        console.log('value',value)
        var new_ans = {...this.state.answers}
        new_ans[category] = value
        this.setState({answers:new_ans})
        console.log(this.state.answers)
    }
    async submitQuiz () {
        const data = {
            title:this.title.current.value, 
            design: this.state.answers.designs,
            feel: this.state.feel, 
            fit: this.state.answers.fit[0], 
            weight: this.state.answers.weight[0], 
            details: this.state.answers.details, 
            sheerness: this.state.answers.sheerness[0],
        }
        await axios.post('https://lura-auth0.herokuapp.com/matchings',data, {withCredentials:true})
        .then(res=>{if(res.status===201){this.setState({index:9})}})
        .catch(err=>{if(err.status===400){alert('Missing Required Field, please check your answers again.')}})
    }
    handleSubmit = () => {
        this.submitQuiz()
    }
    render(){
        return(
            <div>
                <CustomHeader/>
                {this.renderRedirect()}
                <Carousel indicators={false} activeIndex={this.state.index}>
                    <Carousel.Item style={{backgroundImage:`url(${background})`,backgroundSize:'cover',height:'105vh',width:'105vw'}}>
                        <div className="finder-guideline">
                            <p style={{fontSize:'25px',fontWeight:'400',width:'50%'}}>HOW DOES THIS WORK?</p>
                            <p>SELECT ANSWERS FOR 8 QUESTIONS REGARDING HAND-FEEL, FIT ONTHE BODY, DETAILING, COLOR, WEIGHT AND MORE! OUR SYSTEM THEN CURATES THE BEST FABRICS FOR YOUR SPECIFIC DESIGN. TAKE THIS QUIZ UNLIMITED TIMES FOR EVERY DESIGN.</p>
                        </div>
                        <div style={{position:'absolute',right:'10vw', bottom:'10vh', width:'320px'}}>
                            <p style={{color:'#3E5540',fontWeight:'200',fontSize:'25px'}}>FIND THE PERFECT FABRIC FOR YOUR DESIGN</p>
                            <Button style={{fontSize:'15px',backgroundColor:'#F5EBE9',color:'black',borderRadius:'5px',border:'none', padding:'10px 20px'}}
                            onClick={()=>this.setState({index:1})}>Start your consultation</Button>
                        </div>
                    </Carousel.Item>
                    <Carousel.Item className='quiz-background'>
                        <div style={{display:'flex',justifyContent:'center',alignItems:'center',position:'relative',top:'20vh',flexDirection:'column'}}>
                            <p style={{color:'#44524A',fontSize:'30px'}}>BEFORE WE GET STARTED, TITLE YOUR PROJECT!</p>
                            <p>You can refer to all your projects in "My fabric matchings"</p>
                            <Form.Control style={{backgroundColor:'#F5EBE9',boxShadow:'3px 3px 8px 0px rgba(0, 0, 0, 0.15)',width:'40vw',margin:'10vh'}} ref={this.title} placeholder='Gold, Silk, Long-sleeve Top'></Form.Control>
                            <Button className='move-on-btn' onClick={this.handleNextClick}>NEXT</Button>
                        </div>
                    </Carousel.Item>
                    <Carousel.Item className='quiz-background'>
                        <div style={{display:'flex',justifyContent:'center',alignItems:'center',position:'relative',top:'20vh',flexDirection:'column'}}>
                            <p style={{color:'#44524A',fontSize:'30px'}}>WHAT ARE YOU DESIGNING WITH THIS FABRIC?</p>
                                <AnswerGroup options={designs} handleAnsChange={this.handleAnsChange} className='fabric-choice' category='designs'/>
                            <Row className='lura-tip'>
                                <strong>Lura tip: </strong><p> if your design matches more than one category, choose all that work!</p>
                            </Row>
                            <Row>
                                <ProgressButtons indices={this.state.indices}/>
                            </Row>
                            <Row style={{justifyContent:'center',alignItems:'center'}}>
                                <Col>
                                    <Button className='move-on-btn' onClick={this.handleBackClick}>BACK</Button>
                                </Col>
                                <Col>
                                    <Button className='move-on-btn' onClick={this.handleNextClick}>NEXT</Button>
                                </Col>
                            </Row>
                        </div>
                    </Carousel.Item>
                    <Carousel.Item className='quiz-background'>
                        <div style={{display:'flex',justifyContent:'center',alignItems:'center',position:'relative',top:'20vh',flexDirection:'column'}}>
                            <p style={{color:'#44524A',fontSize:'30px'}}>WHAT KIND OF FEEL ARE YOU LOOKING FOR?</p>
                            <Row>
                                <Col className='img-pink-box'>
                                    <Button variant='pink' onClick={()=>{this.setState({feel:'Silky'})}}>
                                        <img src={silky}/>
                                        <p>Silky</p>
                                    </Button>
                                </Col>
                                <Col className='img-pink-box'>
                                    <Button variant='pink'onClick={()=>{this.setState({feel:'Stiff, holds form'})}}>
                                        <img src={stiff}/>
                                        <p>Stiff, holds form</p>
                                    </Button>
                                </Col>
                                <Col className='img-pink-box'>
                                    <Button variant='pink'onClick={()=>{this.setState({feel:'Airy, Easy Wearable'})}}>
                                        <img src={airy}/>
                                        <p>Airy, Easy Wearable</p>
                                    </Button>
                                </Col>
                            </Row>

                            <Row>
                                <Col className='img-pink-box'>
                                    <Button variant='pink'onClick={()=>{this.setState({feel:'Stretchy'})}}>
                                        <img src={stretchy}/>
                                        <p>Stretchy</p>
                                    </Button>
                                </Col>
                                <Col className='img-pink-box'>
                                    <Button variant='pink'onClick={()=>{this.setState({feel:'Comfy, Cozy, Soft, Plush'})}}>
                                        <img src={comfy}/>
                                        <p>Comfy, Cozy, Soft, Plush</p>
                                    </Button>
                                </Col>
                                <Col className='img-pink-box'>
                                    <Button variant='pink'onClick={()=>{this.setState({feel:'Other'})}}>
                                        <p>Other</p>
                                    </Button>
                                </Col>
                            </Row>
                            <Row className='lura-tip'>
                                <strong>Lura tip: </strong><p>  Choose based on the description that matches what you want, not the image!</p>
                            </Row>
                            <Row>
                                <ProgressButtons indices={this.state.indices}/>
                            </Row>
                            <Row style={{justifyContent:'center',alignItems:'center'}}>
                                <Col>
                                    <Button className='move-on-btn' onClick={this.handleBackClick}>BACK</Button>
                                </Col>
                                <Col>
                                    <Button className='move-on-btn' onClick={this.handleNextClick}>NEXT</Button>
                                </Col>
                            </Row>
                        </div>
                    </Carousel.Item>
                    <Carousel.Item className='quiz-background'>
                        <div style={{display:'flex',justifyContent:'center',alignItems:'center',position:'relative',top:'20vh',flexDirection:'column'}}>
                            <p style={{color:'#44524A',fontSize:'30px'}}>WHAT’S THE FIT ON THE BODY?</p>
                            <AnswerGroup options={bodies} className='body-choice' category='fit' handleAnsChange={this.handleAnsChange}/>
                            <Row className='lura-tip'>
                                <strong>Lura tip: </strong><p> if your design matches more than one category, choose all that work!</p>
                            </Row>
                            <Row>
                                <ProgressButtons indices={this.state.indices}/>
                            </Row>
                            <Row style={{justifyContent:'center',alignItems:'center'}}>
                                <Col>
                                    <Button className='move-on-btn' style={{margin:'20px 0'}}onClick={this.handleBackClick}>BACK</Button>
                                </Col>
                                <Col>
                                    <Button style={{margin:'20px 0'}} className='move-on-btn' onClick={this.handleNextClick}>NEXT</Button>
                                </Col>
                            </Row>
                        </div>
                    </Carousel.Item>
                    <Carousel.Item className='quiz-background'>
                        <div style={{display:'flex',justifyContent:'center',alignItems:'center',position:'relative',top:'20vh',flexDirection:'column'}}>
                            <p style={{color:'#44524A',fontSize:'30px'}}>WHAT WEIGHT ARE YOU LOOKING FOR?</p>
                            <AnswerGroup options={fits} className='weight' category='weight' handleAnsChange={this.handleAnsChange}/>
                            <Row>
                                <ProgressButtons indices={this.state.indices}/>
                            </Row>
                            <Row style={{justifyContent:'center',alignItems:'center'}}>
                                <Col>
                                    <Button style={{margin:'40px 0'}} className='move-on-btn' onClick={this.handleBackClick}>BACK</Button>
                                </Col>
                                <Col>
                                    <Button style={{margin:'40px 0'}} className='move-on-btn' onClick={this.handleNextClick}>NEXT</Button>
                                </Col>
                            </Row>
                        </div>
                    </Carousel.Item>
                    <Carousel.Item className='quiz-background'>
                        <div style={{display:'flex',justifyContent:'center',alignItems:'center',position:'relative',top:'20vh',flexDirection:'column'}}>
                            <p style={{color:'#44524A',fontSize:'30px'}}>ANY PARTICULAR DETAILING?</p>
                            <AnswerGroup options={detailings} className='detailing' category='details' handleAnsChange={this.handleAnsChange}/>
                            <Row className='lura-tip'>
                                <strong>Lura Tip: </strong><p> Choose based on the description that matches what you want, not the image!</p>
                            </Row>
                            <Row>
                                <ProgressButtons indices={this.state.indices}/>
                            </Row>
                            <Row style={{justifyContent:'center',alignItems:'center'}}>
                                <Col>
                                    <Button style={{margin:'40px 0'}} className='move-on-btn' onClick={this.handleBackClick}>BACK</Button>
                                </Col>
                                <Col>
                                    <Button style={{margin:'40px 0'}} className='move-on-btn' onClick={this.handleNextClick}>NEXT</Button>
                                </Col>
                            </Row>
                        </div>
                    </Carousel.Item>
                    <Carousel.Item className='quiz-background'>
                        <div style={{display:'flex',justifyContent:'center',alignItems:'center',position:'relative',top:'20vh',flexDirection:'column'}}>
                            <p style={{color:'#44524A',fontSize:'30px'}}>SHEERNESS?</p>
                            <AnswerGroup options={sheernesses} className='weight' category='sheerness'  handleAnsChange={this.handleAnsChange}/>
                            <Row className='lura-tip'>
                                <strong>Lura Tip: </strong><p> Choose based on the description that matches what you want, not the image!</p>
                            </Row>
                            <Row>
                                <ProgressButtons indices={this.state.indices}/>
                            </Row>
                            <Row style={{justifyContent:'center',alignItems:'center'}}>
                                <Col>
                                    <Button style={{margin:'40px 0'}} className='move-on-btn'onClick={this.handleBackClick}>BACK</Button>
                                </Col>
                                <Col>
                                    <Button style={{margin:'40px 0'}} className='move-on-btn' onClick={this.handleNextClick}>NEXT</Button>
                                </Col>
                            </Row>
                        </div>
                    </Carousel.Item>
                    <Carousel.Item className='quiz-background'>
                        <div style={{display:'flex',justifyContent:'center',alignItems:'center',position:'relative',top:'20vh',flexDirection:'column'}}>
                            <p style={{color:'#44524A',fontSize:'30px'}}>UPLOAD AN SKETCH OF YOUR DESIGN</p>
                            <Row>
                                <Form.File id='custom-file-upload' label='Choose file' custom></Form.File>
                            </Row>
                            <Button onClick={()=>{this.setState({show:true})}} className='upload-button'>Upload</Button>
                            <Modal show={this.state.show} onHide={()=>{this.setState({show:false})}} centered style={{border:'none', borderRadius:'25px'}} className='upload-modal'>
                                <Modal.Body style={{display:'flex',justifyContent:'center',padding:'40px',flexDirection:'column',alignItems:'center'}}>
                                    <div>
                                        <p style={{fontSize:'40px'}}>SUCCESS!</p>
                                    </div>
                                    <div>
                                        <p>Upload confirmed.</p>
                                    </div>
                                    <div className='return-button'>
                                        <Button onClick={()=>{this.setState({show: false})}}>Return</Button>
                                    </div>
                                </Modal.Body>
                            </Modal>
                            <Row style={{margin:'80px'}}>
                                <strong>Lura Tip: </strong><p style={{width:'60vw'}}>  Uploading a design helps us understand your needs better, however, this is optional! Upload a .jpg, .png, or .jpeg. If you don’t want to upload anything, hit next.</p>
                            </Row>
                            <Row>
                                <ProgressButtons indices={this.state.indices}/>
                            </Row>
                            <Row style={{justifyContent:'center',alignItems:'center'}}>
                                <Col>
                                    <Button style={{margin:'40px 0'}} className='move-on-btn' onClick={this.handleBackClick}>BACK</Button>
                                </Col>
                                <Col>
                                    <Button style={{margin:'40px 0'}} className='move-on-btn' onClick={this.handleSubmit}>FINISH</Button>
                                </Col>
                            </Row>
                        </div>
                    </Carousel.Item>
                    <Carousel.Item className='quiz-background'>
                    <div style={{display:'flex',justifyContent:'center',alignItems:'center',position:'relative',top:'20vh',flexDirection:'column'}}>
                                <p style={{color:'#44524A',fontSize:'30px'}}>THANK YOU!</p>
                                <div style={{width:'50vw'}}>
                                    <p>Your results will be available within 24 hours through your Lura login, in your account page. You'll get an email when they are ready. </p>
                                </div>
                                <Button onClick={()=>{this.setState({redirect:true})}}style={{margin:'40px 0'}} className='move-on-btn' style={{width:'30vw'}}>My Account</Button>
                        </div>
                    </Carousel.Item>
                </Carousel>
            </div>
        )
    }
}

function AnswerGroup (props) {
    const [value, setValue] = useState([])
    function handleChange (value) {
        setValue(value)
        props.handleAnsChange(value, props.category)
    }
    return (
        <ToggleButtonGroup type="checkbox" value={props.category==='designs'||props.category==='details'?value:value.slice(-1)} onChange={handleChange} className={props.className}>
            {props.options.map(option=>{
                return(<ToggleButton  variant='pink' value={option} className='quiz-choices'>
                    <span className='toggle-close-btn'></span>
                    <p>{option}</p>
                    </ToggleButton>)
            })}
        </ToggleButtonGroup>
      );
}
function ProgressButtons (props) {
    return(
        <div style={{margin:'20px',display:'flex'}}>
            {props.indices.map((key,i) => {
                return(
                    <div className='green-circle' style={{'--background-var':key===1?"#375247":'#B6D8C6'}} key={i}></div>
                )
            })}
        </div>
    )
}