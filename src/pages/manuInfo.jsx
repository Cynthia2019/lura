import React, { Component } from 'react';
import CustomHeader from '../components/header'
import CustomFooter from '../components/footer'
import bgImg from '../img/蒙版组2.png'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import API from '../utils/API'
import { BookOutlined } from '@ant-design/icons'
import { Typography, Divider } from 'antd'
import cer1 from '../img/download.png'
import cer2 from '../img/leed_logo.png'


export default class ManuInfo extends Component {
    constructor(props){
        super(props)
        this.state = {
            show: false,
            id: this.props.match.params.id,
            infos: null,
            background: null, 
            avatar: null,
            swatches: []
        }
    }
    handleClick = () => {
        this.setState({show: true})
    }
    handleClose = () => {
        this.setState({show: false})
    }
    async getManufacturerfromDB () {
        await API.get(`/manufacturers/info/${this.props.match.params.ManuId}`, {withCredentials:true})
        .then(res=>{console.log(res)
            this.setState({infos: res.data.info})
            this.getImagesfromDB(res.data.info)})
        .catch(err=>console.log(err))
    }
    async getImagesfromDB (info) {
        if(info.background){
            const bg_key = info.background.split('/')[1]
            await API.get(`/manufacturers/image/${bg_key}`)
            .then(res=>{if(res.status===200){this.setState({background: res.data})}})
            .catch(err=>{console.log(err)})
        }
        if(info.avatar){
            const avatar_key = info.split('/')[1]
            await API.get(`/manufacturers/image/${avatar_key}`)
            .then(res=>{if(res.status===200){this.setState({avatar: res.data})}})
            .catch(err=>{console.log(err)})
        }
        if(info.swatches !== []){
            info.swatches.map(swatch=>{
                var swatch_key = swatch.split('/')[1]
                API.get(`/manufacturers/image/${swatch_key}`)
                .then(res=>{if(res.status===200){
                    var swatches = [...this.state.swatches]
                    swatches.push(res.data)
                    this.setState({swatches: swatches})
                }})
                .catch(err=>{alert(err)})
            })
        }
    }
    componentDidMount = () => {
        this.getManufacturerfromDB()
    }

    render(){
        const infos = this.state.infos
        if(infos){
        return(
            <div>
                <CustomHeader />
                <div style={{position:'relative', top:'120px', height:'20%', overflow:'hidden'}}>
                    {this.state.background?<img src={`${this.state.background}`} alt="manuBackground" style={{width:'100%'}}/>:<img src={bgImg} alt="manuBackground" style={{width:'100%'}}/>}
                </div>
                <div className="title-line" style={{position:'relative', top:'80px', display:'flex', width:'90%'}}>
                    <Col className='avatar' md={6} style={{paddingLeft:'100px'}}> 
                    {this.state.avatar?
                    <div style={{height:'100px', width:'100px',borderRadius:'10px',backgroundImage:`url(${this.state.avatar})`}}></div>
                    :<div style={{fontSize:'30px', color:'white', fontWeight:'bold',height:'100px', width:'100px',
                     backgroundColor:'darkgreen', borderRadius:'10px'}}>{infos.name}</div>}
                    </Col>
                    <Col md={6} style={{top:'50px', display:'flex', justifyContent:'flex-end'}}>
                        <div className="contact-button" style={{paddingRight:'30px'}}>
                            <Button variant='outline-success' style={{borderRadius:'25px', color:'black'}} onClick={this.handleClick}>Contact</Button>
                        </div>
                        <Modal show={this.state.show} onHide={this.handleClose} centered style={{border:0}}>
                            <Modal.Header closeButton style={{backgroundColor:'rgba(171, 211, 187,0.5)'}}>
                                <Modal.Title>CONTACT</Modal.Title>
                            </Modal.Header>
                            <Modal.Body style={{backgroundColor:'rgba(171, 211, 187,0.5)', color:'rgba(0,0,0,0.75)'}}>
                                        <div><span style={{fontWeight:'bold',fontSize:'20px'}}>Email</span> {infos.email}</div>
                                        <div><span style={{fontWeight:'bold',fontSize:'20px'}}>Tel.</span>  {infos.tel}</div>
                                        <div><span style={{fontWeight:'bold',fontSize:'20px'}}>Contact Name: </span>  {infos.contactName}</div>
                                        <div><span style={{fontWeight:'bold',fontSize:'20px'}}>Brands worked with: </span>  {infos.Brands}</div>
                                    </Modal.Body>
                        </Modal>
                        <div className='saved' >
                            <BookOutlined style={{fontSize:'30px'}}/>
                        </div>
                    </Col>
                </div>
                <div className="main-info" style={{top:'100px', position:'relative', display:'flex', justifyContent:'center', flexDirection:'column', width:'70%', marginLeft:'20%'}}>
                    <Row className='info-overview' style={{justifyContent:'center'}}>
                        <div className="overview-box" style={{backgroundColor:'#FDF8F5', textAlign:'left', width:'1000px', padding:'10px', margin:'30px 0'}}>
                            <div className="overview-title"><h3 style={{fontWeight:'bold'}}>Overview</h3></div>
                            <ul><span style={{fontWeight:'bold', fontSize:'20px'}}>Types of fabric: </span>{infos.type}</ul>
                            <ul><span style={{fontWeight:'bold', fontSize:'20px'}}>Pricing: </span>{infos.price}</ul>
                            <ul><span style={{fontWeight:'bold', fontSize:'20px'}}>Lead Time: </span>{infos.leadTime}</ul>
                            <ul><span style={{fontWeight:'bold', fontSize:'20px'}}>Brands worked with: </span>{infos.Brands}</ul>
                        </div>
                    </Row>
                    <Row className='fabric-swatches' style={{flexDirection:'column', margin:'30px 0'}}>
                        <div className="fabric-title" style={{textAlign:'left'}}><h3 style={{fontWeight:'bold'}}>Fabric Swatches</h3></div>
                        <Row style={{display:'flex', flexDirection:'row',justifyContent:'space-between', margin:'10px 0'}}>
                            {this.state.swatches.map((swatch, i)=>{return(
                                <img src={swatch} style={{width:'15%', height:'15%'}} alt={`swatch-${i}`} key={i}/>
                            )})}
                        </Row>
                    </Row>
                    <Row className='manu-bio' style={{margin:'30px 0', backgroundColor:'#FDF8F5', widht:'1000px', padding:'30px'}}>
                        <h3 style={{fontWeight:'bold'}}>Manufacturer Bio</h3>
                        <Typography.Paragraph style={{lineHeight:'1.5', textAlign:'left'}}>{infos.Bio}</Typography.Paragraph>
                    </Row>
                    <Row className='certificate' style={{backgroundColor:'rgba(182,216,198,0.22)', textAlign:'center', 
                    margin:'30px 0', padding:'30px', justifyContent:'center'}}>
                        <div className="certificate-title"><h1>SUSTAINABILITY CERTIFICATIONS</h1></div>
                        <div className="certificate-box" style={{width:'70%'}}>
                           <Row style={{alignItems:'center'}}>
                            <Col md={3}>
                                <img src={cer1} style={{width:'80%'}} alt=''/>
                            </Col>
                            <Col md={9}>
                                <Typography.Paragraph style={{fontSize:'12px'}}>The MADE IN GREEN label verifies that an article has been tested for harmful substances. This is carried out  through certification in accordance with STANDARD 100 by OEKO-TEX® or LEATHER STANDARD by OEKO-TEX®. It also guarantees that the textile or leather product has been manufactured using sustainable processes under environmentally-friendly and socially responsible working conditions.</Typography.Paragraph>
                            </Col>
                            </Row>
                            <Divider style={{border:"2px solid rgba(0,0,0,0.75)", margin:'10px'}}/>
                            <Row style={{alignItems:'center'}}>
                            <Col md={3}>
                                <img src={cer2} style={{width:'70%'}} alt=''/>
                            </Col>
                            <Col md={9}>
                                <Typography.Paragraph style={{fontSize:'12px'}}>The LEED certification shows that the manufacturing plant itself is sustainable. It ensures that the Carbon Footprint of the entire building is within a certain standard.</Typography.Paragraph>
                            </Col>
                            </Row>
                        </div>
                    </Row>
                </div>
                <CustomFooter />
            </div>
        )} else {
            return(<div></div>)
        }
    }
}