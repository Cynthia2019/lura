import React from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import API from '../utils/API'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'


const config = {
    headers: {
        "Access-Control-Allow-Origin": "*",
        'enctype': 'multipart/form-data'
    },
    withCredentials: true
}

export default class EditManuPage extends React.Component {
    constructor(props){
        super(props)
        this.name = React.createRef()
        this.bio = React.createRef()
        this.location = React.createRef()
        this.type = React.createRef()
        this.contactName = React.createRef()
        this.position = React.createRef()
        this.size = React.createRef()
        this.email = React.createRef()
        this.tel = React.createRef()
        this.fabricType = React.createRef()
        this.pricing = React.createRef()
        this.moq = React.createRef()
        this.leadTime = React.createRef()
        this.susInfo = React.createRef()
        this.state = {
            info: null,
            overview: null,
            contact: null,
            error: null,
            published: false, 
            sustainability: null, 
            name: null, 
            bio:null,
        }

    }
    async getManuInfo () {
        await API.get(`/manufacturers/info/${this.props.match.params.ManuId}?key=1f3ab8f7-2103-4046-9cfc-0d6cf2756602&access=admin`,{withCredentials:true})
        .then(res=>{
            console.log(res.data.info)
            this.setState(
            {
                name: res.data.info.name, 
                bio: res.data.info.bio, 
                info:res.data.info.info, 
                overview:res.data.info.overview,
                contact: res.data.info.contact,
                published: res.data.info.published,
                sustainability: res.data.info.sustainability
        })})
        .catch(err=>console.log(err))
    }
    componentDidMount = () => {
        this.getManuInfo()
    }
    publishManu = () => {
        console.log(this.props)
        API.patch(`/manufacturers/admin/publish/${this.props.match.params.ManuId}${this.state.published?"unpublish=true":""}?key=1f3ab8f7-2103-4046-9cfc-0d6cf2756602&access=admin`,{},config)
        .then(res=>alert('Manufacturer published'))
        .catch(err=>this.setState({error: err}))
    }
    async updateName () {
        await API.patch(`/manufacturers/admin/edit/${this.props.match.params.ManuId}/name?key=1f3ab8f7-2103-4046-9cfc-0d6cf2756602&access=admin`, {
            name:this.name.current.value?this.name.current.value:this.state.name, 
        }, config).then(res=>{if(res.status===200){console.log(res.data)}})
        .catch(err=>this.setState({error: err}))
    }
    async updateBio () {
        await API.patch(`/manufacturers/admin/edit/${this.props.match.params.ManuId}/bio?key=1f3ab8f7-2103-4046-9cfc-0d6cf2756602&access=admin`, {
            bio:this.bio.current.value?this.bio.current.value:this.state.bio, 
        }, config).then(res=>{if(res.status===200){console.log(res.data)}})
        .catch(err=>this.setState({error: err}))
    }
    async updateInfo () {
        await API.patch(`/manufacturers/admin/edit/${this.props.match.params.ManuId}/info?key=1f3ab8f7-2103-4046-9cfc-0d6cf2756602&access=admin`, {
                type: this.type.current.value?this.type.current.value:this.state.info.type,
                location: this.location.current.value?this.location.current.value:this.state.info.location,
                employees: this.size.current.value?this.size.current.value:this.state.info.employees,
        }, config).then(res=>{if(res.status===200){console.log(res.data)}})
        .catch(err=>this.setState({error: err}))
    }
    async updateOverview () {
        await API.patch(`/manufacturers/admin/edit/${this.props.match.params.ManuId}/overview?key=1f3ab8f7-2103-4046-9cfc-0d6cf2756602&access=admin`, {
                fabricTypes: this.fabricType.current.value?this.fabricType.current.value.split(','):this.state.overview.fabricTypes,
                minimumOrderQuantity: this.moq.current.value?this.moq.current.value:this.state.overview.moq,
                pricing: this.pricing.current.value?this.pricing.current.value:this.state.overview.pricing,
                leadTime: this.leadTime.current.value?this.leadTime.current.value:this.state.overview.leadTime,
        }, config).then(res=>{if(res.status===200){console.log(res.data)}})
        .catch(err=>this.setState({error: err}))
    }
    async updateContact () {
        await API.patch(`/manufacturers/admin/edit/${this.props.match.params.ManuId}/contact?key=1f3ab8f7-2103-4046-9cfc-0d6cf2756602&access=admin`,
        {
            email: this.email.current.value?this.email.current.value:this.state.contact.email,
            tel: this.tel.current.value?this.tel.current.value:this.state.contact.tel,
            name:this.contactName.current.value?this.contactName.current.value:this.state.contact.name,
            position: this.position.current.value?this.position.current.value:this.state.contact.position
        }).then(res=>{if(res.status===200){console.log(res.data)}})
        .catch(err=>this.setState({error: err}))
    }
    async updatePractices () {
        const regex = /\s*\d\)\s*/
        await API.patch(`/manufacturers/admin/edit/${this.props.match.params.ManuId}/practices?key=1f3ab8f7-2103-4046-9cfc-0d6cf2756602&access=admin`,
        {
            practices: this.susInfo.current.value?this.susInfo.current.value.split(regex).slice(1):this.state.sustainability
        }).then(res=>{if(res.status===200){
            this.checkError()
        }})
        .catch(err=>this.setState({error: err}))
    }
    checkError = () => {
        if(!this.state.error){
            alert('update information successfully')
            window.location.reload(false)
        }
    }
    handleClick = (e) => {
        e.preventDefault()
        this.updateName()
        this.updateBio()
        this.updateInfo()
        this.updateOverview()
        this.updateContact()
        this.updatePractices()
    }
    handlePublish = () => {
        this.publishManu()
    }
    render(){
        if(this.state.info){
        return(
            <div style={{margin:'40px', display:'flex',alignItems:'center',flexDirection:'column'}}>
                <h3>Edit Manufacturer</h3>
                <Form>
                    <Row>
                        <Col>
                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Control type='text' ref={this.name} placeholder={this.state.name}/>
                        </Form.Group>
                        </Col>
                        <Col>
                        <Form.Group>
                            <Form.Label>Type</Form.Label>
                            <Form.Control type='text' ref={this.type} placeholder={this.state.info.type}/>
                        </Form.Group>
                        </Col>
                        <Col>
                        <Form.Group>
                            <Form.Label>Location</Form.Label>
                            <Form.Control type='text' ref={this.location} placeholder={this.state.info.location}/>
                        </Form.Group>
                        </Col>
                        <Col>
                        <Form.Group>
                            <Form.Label>Size</Form.Label>
                            <Form.Control type='text' placeholder={this.state.info.employees} ref={this.size}/>
                        </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                        <Form.Group>
                            <Form.Label>Contact Name</Form.Label>
                            <Form.Control type='text' placeholder={this.state.contact.name} ref={this.contactName}/>
                        </Form.Group>
                        </Col>
                        <Col>
                        <Form.Group>
                            <Form.Label>Position</Form.Label>
                            <Form.Control type='text' placeholder={this.state.contact.position} ref={this.position}/>
                        </Form.Group>
                        </Col>
                        <Col>
                        <Form.Group>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type='text' placeholder={this.state.contact.email} ref={this.email}/>
                        </Form.Group>
                        </Col>
                        <Col>
                        <Form.Group>
                            <Form.Label>Telephone</Form.Label>
                            <Form.Control type='text' placeholder={this.state.contact.tel} ref={this.tel}/>
                        </Form.Group>
                        </Col>
                    </Row>
                    <Form.Group>
                        <Form.Label>Types of Fabrics</Form.Label>
                        <Form.Control as='textarea' ref={this.fabricType} placeholder={this.state.overview.fabricTypes}/>
                    </Form.Group>
                    <Row>
                        <Col>
                        <Form.Group>
                            <Form.Label>Average Pricing</Form.Label>
                            <Form.Control type='text' ref={this.pricing} placeholder={this.state.overview.pricing}/>
                        </Form.Group>
                        </Col>
                        <Col>
                        <Form.Group>
                            <Form.Label>MOQ</Form.Label>
                            <Form.Control type='text' ref={this.moq} placeholder={this.state.overview.minimumOrderQuantity}/>
                        </Form.Group>
                        </Col>
                        <Col>
                        <Form.Group>
                            <Form.Label>Lead Time</Form.Label>
                            <Form.Control type='text' ref={this.leadTime} placeholder={this.state.overview.leadTime}/>
                        </Form.Group>
                        </Col>
                    </Row>
                    <Form.Group>
                        <Form.Label>Sustainability Information</Form.Label>
                        <Form.Control as='textarea' ref={this.susInfo} placeholder={this.state.sustainability.practices}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Bio</Form.Label>
                        <Form.Control as='textarea' ref={this.bio} placeholder={this.state.bio}/>
                    </Form.Group>
                </Form>
                <Row >
                    <Button onClick={this.handleClick} variant='outline-info' style={{margin:'0 20px'}}>Save Changes</Button>
                    <Button onClick={this.handlePublish} variant='outline-danger'>{this.state.published?"Unpublish":"Publish"}</Button>
                </Row>
                <Button href='/admin' variant='success' style={{margin:'20px 0'}}>Back</Button>
            </div>
        )} else {
            return (<div></div>)
        }
    }
}