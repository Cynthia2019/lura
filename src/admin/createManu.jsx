import React from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { config } from '../utils/config'
import API from '../utils/API'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

export default class CreateManuPage extends React.Component {
    constructor(props){
        super(props)
        this.name = React.createRef()
        this.bio = React.createRef()
    }
    async putManuIntoDB () {
        await API.post('/manufacturers/admin/create', {
            name: this.name.current.value,
            bio: this.bio.current.value
        }, config)
        .then(res=>{if(res.status===201){alert('Created Successfully')}})
        .catch(err=>console.log(err))
    }
    handleClick = (e) => {
        e.preventDefault()
        if(this.name.current.value) {
            this.putManuIntoDB()
        } else {
            alert('please enter the name')
        }
    }
    render(){
        return(
            <div style={{top:'100px',position:'relative', display:'flex',alignItems:'center',flexDirection:'column'}}>
                <h3>Create A New Manufacturer</h3>
                <Form>
                    <Form.Group>
                        <Form.Label>Name</Form.Label>
                        <Form.Control type='text' ref={this.name}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Bio</Form.Label>
                        <Form.Control as='textarea' ref={this.bio}/>
                    </Form.Group>
                </Form>
                <Button onClick={this.handleClick} variant='outline-info'>Submit</Button>
                <Button href='/admin' variant='success' style={{margin:'20px 0'}}>Back</Button>
            </div>
        )
    }
}