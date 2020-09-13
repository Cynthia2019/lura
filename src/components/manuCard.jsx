import React from 'react'; 
import { BookOutlined, EnvironmentFilled, BookFilled } from '@ant-design/icons'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import API from '../utils/API'
import {config} from '../utils/config'
import './manuCard.css'

export default class Card extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            info: null,
            show: false,
            saved: false
        }
    }
    componentDidMount = () => {
        this.props.saved.forEach(save => {
            if(save._id === this.props.info._id) {
                this.setState({saved: true})
            }
        })
    }
    handleButtonClick = () => {
        if(this.state.saved){
            this.setState({saved: false})
            this.handleUnsave()
        } else {
            this.setState({saved: true})
            this.handleSave()
        }
    }
    handleClose = () => {
        this.setState({show:false})
    }
    handleClick = () => {
        this.setState({show:true})
    }
    async handleSave () {
        await API.post(`/manufacturers/save/${this.props.info._id}`,{},config)
        .then(res=>{console.log(res)})
        .catch(err=>console.log(err))
    }
    async handleUnsave () {
        await API.delete(`/manufacturers/save/${this.props.info._id}`,config)
        .then(res=>console.log(res))
        .catch(err=>console.log(err))
    }
    render(){
        const {info} = this.props
        const {saved} = this.props
        console.log(info, saved)
        return(
            <div>
                <div className="card">
                    <div className="card-body">
                        <div className="card-title">
                            <h1 style={{fontWeight:200}}>{info.name}</h1>
                            <Button onClick={this.handleButtonClick} className='save-button'>
                                {this.state.saved?<BookFilled style={{fontSize:'35px',alignSelf:'baseline'}}/>:<BookOutlined style={{fontSize:'30px',alignSelf:'baseline'}}/>}
                            </Button>
                        </div>
                        <div className="card-text">
                        <Row>
                            <Col md={9} className='info-display'>
                            <ul><span style={{margin:'5px'}}><EnvironmentFilled/></span>{info.info.location?info.info.location:'N/A'}</ul>
                            <ul><span>Fabrics produced: </span>{info.overview.fabricTypes?info.overview.fabricTypes:'N/A'}</ul>
                            <ul><span>Minimum: </span>{info.overview.minimum?info.overview.minimum:'N/A'}</ul>
                            <ul><span>Average Pricing: </span>{info.overview.pricing?info.overview.pricing:'N/A'}</ul>
                            </Col>
                            <Col md={3} style={{display:'flex', justifyContent:'space-between', flexDirection:'column'}}>
                                <Button className='more-info-button' href={`/manufacture-database/${info._id}`} saved={this.state.saved}>More Info</Button>
                                <Button className='contact-button' onClick={this.handleClick}>CONTACT</Button>
                                <Modal show={this.state.show} onHide={this.handleClose} centered style={{border:0}}>
                                    <Modal.Header closeButton style={{backgroundColor:'rgba(248, 234, 234,1)'}}>
                                        <Modal.Title>CONTACT</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body style={{backgroundColor:'rgba(171, 211, 187,0.5)', color:'rgba(248, 234, 234,1)'}}>
                                        <div><span style={{fontWeight:'bold',fontSize:'20px'}}>Name: </span> {info.contact.contactName?info.contact.contactName:'N/A'}</div>
                                        <div><span style={{fontWeight:'bold',fontSize:'20px'}}>Position: </span> {info.contact.contactName?info.contact.position:'N/A'}</div>
                                        <div><span style={{fontWeight:'bold',fontSize:'20px'}}>Email</span> {info.contact.email?info.contact.email:'N/A'}</div>
                                        <div><span style={{fontWeight:'bold',fontSize:'20px'}}>Tel.</span>  {info.contact.tel?info.contact.tel:'N/A'}</div>
                                    </Modal.Body>
                                </Modal>
                            </Col>
                        </Row>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}