import React, { Component } from 'react';
import CustomHeader from '../components/header'
import CustomFooter from '../components/footer'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import API from '../utils/API'
import { BookOutlined, EnvironmentOutlined, TeamOutlined } from '@ant-design/icons'
import { Typography, Divider } from 'antd'
import cer1 from '../img/download.png'
import cer2 from '../img/leed_logo.png'
import leaf from '../img/leaf.png'


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
            this.setState({infos: res.data.info})})
        .catch(err=>console.log(err))
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
                <div style={{position:'relative', top:'150px', display:'flex',flexDirection:'column',marginBottom:'50px'}}>
                <Row className="title-line" style={{flexDirection:'column'}}>
                    <div className='manu-name' style={{fontSize:'50px',fontWeight:'bold',color:'rgb(55,82,71)'}}>{infos.name}</div>
                    <div style={{padding:'5px'}}>{infos.info.type}</div>
                    <div style={{padding:'5px'}}><EnvironmentOutlined />{infos.info.location}</div>
                    <div style={{display:'flex', justifyContent:'center',padding:'5px'}}>
                        <div className="contact-button" style={{paddingRight:'30px'}}>
                            <Button variant='outline-success' style={{borderRadius:'10px', color:'black'}} onClick={this.handleClick}>CONTACT</Button>
                        </div>
                        <Modal show={this.state.show} onHide={this.handleClose} centered style={{border:0}}>
                            <Modal.Header closeButton style={{backgroundColor:'rgba(171, 211, 187,0.5)'}}>
                                <Modal.Title>CONTACT</Modal.Title>
                            </Modal.Header>
                            <Modal.Body style={{backgroundColor:'rgba(171, 211, 187,0.5)', color:'rgba(0,0,0,0.75)'}}>
                                        <div><span style={{fontWeight:'bold',fontSize:'20px'}}>Name: </span>  {infos.contact.name}</div>
                                        <div><span style={{fontWeight:'bold',fontSize:'20px'}}>Position: </span>  {infos.contact.position}</div>
                                        <div><span style={{fontWeight:'bold',fontSize:'20px'}}>Email</span> {infos.contact.email}</div>
                                        <div><span style={{fontWeight:'bold',fontSize:'20px'}}>Tel.</span>  {infos.contact.tel}</div>
                            </Modal.Body>
                        </Modal>
                        <div className='saved' >
                            <BookOutlined style={{fontSize:'30px'}}/>
                        </div>
                    </div>
                </Row>
                <div className="main-info" style={{display:'flex', justifyContent:'center', flexDirection:'column'}}>
                    <Row className='info-overview' style={{justifyContent:'center'}}>
                        <div className="overview-box" style={{backgroundColor:'#FDF8F5', textAlign:'left', width:'1000px', padding:'10px', margin:'30px 0'}}>
                            <div className="overview-title"><h3 style={{fontWeight:'bold'}}>Overview</h3></div>
                            <ul><span style={{fontWeight:'bold', fontSize:'20px'}}>Types of fabric: </span>{infos.overview.fabricTypes}</ul>
                            <ul><span style={{fontWeight:'bold', fontSize:'20px'}}>Average Pricing: </span>{infos.overview.pricing}</ul>
                            <ul><span style={{fontWeight:'bold', fontSize:'20px'}}>Minimum Order Quantity: </span>{infos.overview.minimumOrderQuantity}</ul>
                            <ul><span style={{fontWeight:'bold', fontSize:'20px'}}>Lead Time: </span>{infos.overview.leadTime}</ul>
                        </div>
                    </Row>
                    <Row className='certificate' style={{backgroundColor:'rgba(245,235,233,1)', textAlign:'center', 
                    margin:'30px 0', padding:'30px', justifyContent:'center',flexDirection:'column',alignItems:'center'}}>
                        <div className="certificate-title"><h1>SUSTAINABILITY CERTIFICATIONS</h1></div>
                        <Row style={{justifyContent:'center',flexDirection:'column',alignItems:'center'}} >
                        {infos.sustainability.practices.map((practice, i)=>{
                                                    return(
                                                    <div key={i}><img src={leaf} alt={''} style={{padding:'0 5px'}}/>{practice}</div>
                                                    )
                                                })}
                        </Row>
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
                <Row className='manu-bio' style={{margin:'30px 0', backgroundColor:'#FDF8F5', widht:'1000px', padding:'30px', width:'70%',marginLeft:'20%'}}>
                        <h3 style={{fontWeight:'bold'}}>Manufacturer Bio</h3>
                        <Typography.Paragraph style={{lineHeight:'1.5', textAlign:'left'}}>{infos.bio}</Typography.Paragraph>
                </Row>
                </div>
                <CustomFooter />
            </div>
        )} else {
            return(<div></div>)
        }
    }
}