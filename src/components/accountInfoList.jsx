import React, { Component } from 'react';
import EditModal from './editModal'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import API from '../utils/API'
import { Switch, Redirect, Link } from 'react-router-dom';
import '../pages/account.css'

export default class AccountInfoList extends Component {
    handleClick = () => {
        API.post('/password').then((res)=>{if(res.status===201){alert('password changed')}})
        .catch(err=>{alert(err.message)})
    }
    render(){
        const info = this.props.info
        return(
            <Row>
                <Col md={2} xs={5} style={{textAlign:'left',display:'flex',flexDirection:'column', marginTop:'10vh'}} className='account-setting-list'>
                            <div><li>First Name: </li></div>
                            <div><li>Last Name: </li></div>
                            <div><li>Email: </li></div>
                            <div><li >Password: </li></div>
                            <div><li>Phone: </li></div>
                            </Col>
                            <Col md={6} xs={7} className='account-setting' style={{textAlign:'left',display:'flex',flexDirection:'column',marginTop:'10vh'}}>
                                <div>{info.firstName}</div>
                                <div>{info.lastName}</div>
                                <div>{info.email}</div>
                                {info.id && info.id.split('|')[0] === 'auth0'?<div>
                                    <Form.Control placeholder={info.password} style={{width:'60%',backgroundColor:'#EBE0D8',borderColor:'#EBE1D9'}}></Form.Control>
                                    <Button onClick={this.handleClick} variant='link'>EDIT</Button>
                                    </div>:<div>{info.password}</div>}
                                <div>
                                    <Form.Control placeholder={info.phone} style={{width:'60%',backgroundColor:'#EBE0D8',borderColor:'#EBE1D9'}}></Form.Control>
                                    <EditModal type='phone' info={info}/>
                                </div>
                            </Col>
            </Row>
        )
    }
}