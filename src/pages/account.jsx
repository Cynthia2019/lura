import React, { Component } from 'react';
import CustomHeader from '../components/header'
import CustomFooter from '../components/footer'
import MyFabrics from '../pages/myFabrics'
import AccountInfoList from '../components/accountInfoList'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import API from '../utils/API'
import { Switch, Redirect, Link } from 'react-router-dom';
import './account.css'


export default class AccountPage extends Component {
    constructor(props){
        super(props)
        this.state = {
            show: false,
            id: null,
            firstName: null, 
            lastName: null, 
            email: null, 
            password: null,
            phone: null, 
            saved: null, 
            redirect: false,
            data: null,
            matchings: false
        }
    }
    componentDidMount = () => {
        this.getUserFromDB()
        this.getSavedFromDB()
    }
    async getUserFromDB() {
        await API.get(`/user`, {withCredentials:true})
        .then(res=>{
            if(res.data==={}){this.setState({data: 'no-user'})}
            this.setState({
                id: res.data.id,
                firstName: res.data.given_name, 
                lastName: res.data.family_name,
                email: res.data.username, 
                brands: res.data.apparel_brand,
                employees: res.data.number_of_employees,
                pieces: res.data.pieces_produced
            })
        })
        .catch(err=>console.log(err))
    }
    async getSavedFromDB() {
        await API.get('/save', {withCredentials:true})
        .then(res=>{
            this.setState({
                saved: res.data.saved
            })
        })
    }
    handleLogoutClick = (e) => {
        e.preventDefault()
        this.handleLogout()
    }
    async handleLogout () {
        await API.get('https://lura-services.herokuapp.com/logout')
        .then(res=>{
            if(res.status===200){
                alert('Logout Successfully')
                this.setRedirect()
            }})
        .catch(err=>console.log(err))
    }
    setRedirect = () => {
        this.setState({redirect:true})
    }
    renderRedirect = (to) => {
        if(this.state.redirect){
            return(
            <Switch>
                <Redirect from='/account' to={to}/>
            </Switch>
            )
        }
    }
    handleClose = () => {
        this.setState({show: false})
    }
    handleOpen = () => {
        this.setState({show: true})
    }
    render(){
        if(this.state.data!=='no-user'){
            return(
                <div>
                    <CustomHeader />
                    <div className="account-main" style={{backgroundColor:'#FBF6F2', padding:'5vw',minHeight:'90vh'}}>
                        {this.renderRedirect('/')}
                        <div className="account-title" style={{display:'flex',flexDirection:'row', justifyContent:'space-between',padding:'30px', top:'10vh', position:'relative'}}>
                            <Col md={4}></Col>
                            <Col md={4}><h3 style={{color:'#2B4840'}} >Hello, {this.state.firstName}</h3></Col>
                            <Col md={4} style={{display:'flex',justifyContent:'flex-end',alignSelf:'baseline'}}><Button variant='danger' onClick={this.handleLogoutClick}>Logout</Button></Col>
                        </div>
                        <Row className='account'>
                            <Col md={4} className="account-info">
                                <div className="avatar-line" style={{display:'flex',justifyContent:'center',flexDirection:'row', alignItems:'center', height:'30vh'}}>
                                    <div className="avatar" style={{borderRadius:'50px', backgroundColor:'#4A645C',color:"white", width:'80px', height:'80px',display:'flex',justifyContent:'center',alignItems:'center'}}>
                                        <span style={{fontSize:'35px'}}>{this.state.firstName?this.state.firstName[0]:""}{this.state.lastName?this.state.lastName[0]:""}</span>
                                    </div>
                                    <Link to='/account'>
                                        <div style={{color:'#4A645C', marginLeft:'20px'}}>MY ACCOUNT</div>
                                    </Link>
                                </div>
                                <div style={{display:'flex',flexDirection:'column', height:'10vh'}}>
                                    <Button style={{border:0, color:'grey', backgroundColor:'transparent', textDecoration:'underline', margin:'10px'}} onClick={this.handleOpen}>Saved Manufacturers</Button>
                                        <Modal show={this.state.show} onHide={this.handleClose}>
                                            <Modal.Header closeButton>
                                                <Modal.Title>Saved Manufacturers</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>{this.state.saved && this.state.saved.length !== 0?this.state.saved.map(manu => {return(<ul>{manu.name}</ul>)}):"Oops, you have not saved any manufacturer yet."}</Modal.Body>
                                        </Modal>
                                    <Button style={{border:0, color:'grey', backgroundColor:'transparent', textDecoration:'underline',margin:'10px'}} onClick={()=>{this.setState({matchings:!this.state.matchings})}}>My Fabric Matchings</Button>
                                </div>
                            </Col>
                            <Col md={8}>
                                {this.state.matchings?<MyFabrics info={this.state}/>:<AccountInfoList info={this.state}/>}
                            </Col>
                        </Row>
                    </div>
                    <CustomFooter footer={'second'}/>
                </div>
            )
        } else {
            return(
                <div>
                    {this.renderRedirect('/')}
                </div>
            )
        }
    }
}
