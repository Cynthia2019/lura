import React, { Component } from 'react';
import  Image1 from '../img/jazmin-quaynor-bYOi200uQ6w-unsplash.jpg';
import Image2 from '../img/sharon-mccutcheon-Th_WZMUPnO4-unsplash.jpg'
import Image3 from '../img/jean-marc-vieregge-cDKqFb-NOZc-unsplash.jpg'
import Image4 from '../img/siora-photography-SZF0wG5SXsU-unsplash.jpg'
import Image5 from '../img/actionvance-UvisJMJmqAU-unsplash.jpg'
import Image6 from '../img/leone-venter-mTkXSSScrzw-unsplash.jpg'
import Image7 from '../img/skyla-design-qPE-5Nn7xwU-unsplash.jpg'
import Image8 from '../img/ellieelien-gT4CnGJTido-unsplash.jpg'
import { Row, Col } from 'antd'
import './mainContent.css'

export default class MainContent extends Component {
    render(){
        return(
            <div className='content-container'>
                <Row style={{padding:'40px', marginTop:'100px'}}>
                    <text style={{fontSize:'40px'}}>HOW WE WORK</text>
                </Row>
                <Row style={{height:'1300px'}}>
                    <div className='img_1'>
                        <img src={Image1} style={{width: '825px'}}></img>
                    </div>
                    <div className="text-block-1">
                        <div className="step-one">
                            <text>STEP ONE</text>
                            <p>Order samples! Go through our selection of sustainable fabrics, 
                                and either use our fabric matcher or self select the samples you love most. 
                                Our fabric matcher takes your fabric preferences, textures, materials, price points etc 
                                and formulates the 10 best fabrics for your specific needs. We deliver these right to your 
                                door.</p>
                        </div>
                    </div>
                    <div className="img_2">
                        <img src={Image2} style={{height: '588.75px', width: '470.25px'}}></img>
                    </div>
                    <div className="img_3">
                        <img src={Image3} style={{height: '648px', width: '411px', transform: 'rotate(90deg)' }}></img>
                    </div>
                </Row>
                <Row style={{height:'800px'}}>
                    <div className="img_4">
                        <img src={Image4} style={{height: '337.5px', width: '783px' }}></img>
                    </div>
                    <div className="text-block-2">
                    <div className="step-two">
                        <text>STEP TWO</text>
                            <p>Once you’ve ordered, choose the best fabric for your designs and place the full orders through out platform. Cut out the hassle of contacting manufacturers by buying the perfect fabric through us. 
                                We significantly reduce the minimums and deliver a seamless sourcing 
                                process. </p>
                        </div>
                    </div>
                    <div className="img_5">
                        <img src={Image5} style={{width: '337.5px', height: '724.5px'}}></img>
                    </div>
                </Row>
                <Row style={{height:'1150px'}}>
                    <div className="img_6">
                        <img src={Image6} style={{width: '656.25px', height: '354px' }}></img>
                    </div>
                    <div className="img_7">
                        <img src={Image7} style={{ width: '585px', height:'354px' }}></img>
                    </div>
                    <div className="text-block-3">
                    <div className="step-three">
                        <text>STEP THREE</text>
                            <p>The fabric you order is delivered wherever you want to help you bring 
                                your designs to life! Simplify your sourcing process with the simplicity 
                                of our service. </p>
                    </div>
                    </div>
                    <div className="img_8">
                        <img src={Image8} style={{height: '668.25px', width: '430px' }}></img>
                    </div>
                </Row>
            </div>
        )
    }
}