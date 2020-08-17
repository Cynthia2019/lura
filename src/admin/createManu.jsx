import React from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import API from '../utils/API'

const config = {
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type":'application/json'
    },
    withCredentials: true
}

export default class CreateManuPage extends React.Component {
    constructor(props){
        super(props)
        this.name = React.createRef()
        this.bio = React.createRef()
        this.avatar = React.createRef()
    }
    async putManuIntoDB () {
        const fd = new FormData();
        fd.append('image', this.avatar.current.value)
        await API.post('/manufacturers/admin/create', {
            name:this.name.current.value, 
            avatar: this.avatar.current.value, 
            bio: this.bio.current.value
        }, config)
        .then(res=>alert('created successfully'))
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
                        <Form.Control type='text' ref={this.bio}/>
                    </Form.Group>
                    <Form.File>
                        <Form.File.Label>Avatar</Form.File.Label>
                        <Form.File.Input ref={this.avatar}/>
                    </Form.File>
                </Form>
                <Button onClick={this.handleClick} variant='outline-info'>Submit</Button>
                <Button href='/admin' variant='success' style={{margin:'20px 0'}}>Back</Button>
            </div>
        )
    }
}