import React, { Component } from 'react';
import  Image1 from '../img/jazmin-quaynor-bYOi200uQ6w-unsplash.jpg';
import Image2 from '../img/sharon-mccutcheon-Th_WZMUPnO4-unsplash.jpg'
import Image3 from '../img/jean-marc-vieregge-cDKqFb-NOZc-unsplash.jpg'
import Image4 from '../img/siora-photography-SZF0wG5SXsU-unsplash.jpg'
import Image5 from '../img/actionvance-UvisJMJmqAU-unsplash.jpg'
import Image6 from '../img/leone-venter-mTkXSSScrzw-unsplash.jpg'
import Image7 from '../img/skyla-design-qPE-5Nn7xwU-unsplash.jpg'
import Image8 from '../img/ellieelien-gT4CnGJTido-unsplash.jpg'
import { Row } from 'antd'
import './mainContent.css'

export default class MainContent extends Component {
    render(){
        return(
            <div className='content-container'>
                <Row style={{padding:'40px', marginTop:'100px'}}>
                    <p style={{fontSize:'40px'}}>HOW WE WORK</p>
                </Row>
                <Row className='row-1'>
                    <div className='img_1'>
                        <img src={Image1} style={{width: '40vw'}} alt='1'></img>
                    </div>
                    <div className="text-block-1">
                        <div className="step-one">
                            <p>STEP ONE</p>
                            <p>Order samples! Go through our selection of sustainable fabrics, 
                                and either use our fabric matcher or self select the samples you love most. 
                                Our fabric matcher takes your fabric preferences, textures, materials, price points etc 
                                and formulates the 10 best fabrics for your specific needs. We deliver these right to your 
                                door.</p>
                        </div>
                    </div>
                    <div className="img_2">
                        <img src={Image2} style={{width: '30vw'}} alt='2'></img>
                    </div>
                    <div className="img_3">
                        <img src={Image3} alt='3' style={{width: '25vw', transform: 'rotate(90deg)' }}></img>
                    </div>
                </Row>
                <Row className='row-2'>
                    <div className="img_4">
                        <img src={Image4} style={{width: '30vw'}} alt='4'></img>
                    </div>
                    <div className="text-block-2">
                    <div className="step-two">
                        <p>STEP TWO</p>
                            <p>Once you’ve ordered, choose the best fabric for your designs and place the full orders through out platform. Cut out the hassle of contacting manufacturers by buying the perfect fabric through us. 
                                We significantly reduce the minimums and deliver a seamless sourcing 
                                process. </p>
                        </div>
                    </div>
                    <div className="img_5">
                        <img src={Image5} alt='5' style={{width: '20vw', height: '60vh'}}></img>
                    </div>
                </Row>
                <Row className='row-3'>
                    <div className="img_6">
                        <img src={Image6} alt='6' style={{width: '35vw' }}></img>
                    </div>
                    <div className="img_7">
                        <img src={Image7} style={{ width: '35vw'}} alt='7'></img>
                    </div>
                    <div className="text-block-3">
                    <div className="step-three">
                        <p>STEP THREE</p>
                            <p>The fabric you order is delivered wherever you want to help you bring 
                                your designs to life! Simplify your sourcing process with the simplicity 
                                of our service. </p>
                    </div>
                    </div>
                    <div className="img_8">
                        <img src={Image8} style={{width: '20vw' }} alt='8'></img>
                    </div>
                </Row>
            </div>
        )
    }
}