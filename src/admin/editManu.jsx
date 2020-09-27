import React from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import API from '../utils/API'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import ChangeInfo from './editUpdateFunctions'


const config = {
    headers: {
        "Access-Control-Allow-Origin": "*",
        'enctype': 'multipart/form-data'
    },
    withCredentials: true
}
const temp = '?key=1f3ab8f7-2103-4046-9cfc-0d6cf2756602&access=admin'
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
        this.certImage = React.createRef()
        this.certName = React.createRef()
        this.certLabel = React.createRef()
        this.state = {
            info: null,
            overview: null,
            contact: null,
            error: null,
            published: false, 
            sustainability: null, 
            name: null, 
            bio:null,
            image: null
        }

    }
    async getManuInfo () {
        await API.get(`/manufacturers/info/${this.props.match.params.ManuId}`,{withCredentials:true})
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
                sustainability: res.data.info.sustainability,
        })})
        .catch(err=>console.log(err))
    }
    componentDidMount = () => {
        this.getManuInfo()
    }
    publishManu = () => {
        console.log(this.props)
        API.patch(`/manufacturers/admin/publish/${this.props.match.params.ManuId}${this.state.published?"unpublish=true":""}`,{},config)
        .then(res=>alert('Manufacturer published'))
        .catch(err=>this.setState({error: err}))
    }
    async updateName () {
        await API.patch(`/manufacturers/admin/edit/${this.props.match.params.ManuId}/name`, {
            name:this.name.current.value?this.name.current.value:this.state.name, 
        }, config).then(res=>{if(res.status===200){console.log(res.data)}})
        .catch(err=>this.setState({error: err}))
    }
    async updateBio () {
        await API.patch(`/manufacturers/admin/edit/${this.props.match.params.ManuId}/bio`, {
            bio:this.bio.current.value?this.bio.current.value:this.state.bio, 
        }, config).then(res=>{if(res.status===200){console.log(res.data)}})
        .catch(err=>this.setState({error: err}))
    }
    async updateInfo () {
        await API.patch(`/manufacturers/admin/edit/${this.props.match.params.ManuId}/info`, {
                type: this.type.current.value?this.type.current.value:this.state.info.type,
                location: this.location.current.value?this.location.current.value:this.state.info.location,
                employees: this.size.current.value?this.size.current.value:this.state.info.employees,
        }, config).then(res=>{if(res.status===200){console.log(res.data)}})
        .catch(err=>this.setState({error: err}))
    }
    async updateOverview () {
        await API.patch(`/manufacturers/admin/edit/${this.props.match.params.ManuId}/overview`, {
                fabricTypes: this.fabricType.current.value?this.fabricType.current.value.split(','):this.state.overview.fabricTypes,
                minimumOrderQuantity: this.moq.current.value?this.moq.current.value:this.state.overview.moq,
                pricing: this.pricing.current.value?this.pricing.current.value:this.state.overview.pricing,
                leadTime: this.leadTime.current.value?this.leadTime.current.value:this.state.overview.leadTime,
        }, config).then(res=>{if(res.status===200){console.log(res.data)}})
        .catch(err=>this.setState({error: err}))
    }
    async updateContact () {
        await API.patch(`/manufacturers/admin/edit/${this.props.match.params.ManuId}/contact`,
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
        await API.patch(`/manufacturers/admin/edit/${this.props.match.params.ManuId}/practices`,
        {
            practices: this.susInfo.current.value?this.susInfo.current.value.split(regex).slice(1):this.state.sustainability
        }).then(res=>{if(res.status===200){
            this.checkError()
        }})
        .catch(err=>this.setState({error: err}))
    }
    async addCertificate () {
        console.log(this.state.image, 'image')
        var f = new FormData()
        f.append('name',this.certName.current.value)
        f.append('label',this.certLabel.current.value)
        f.append('image',this.state.image)
        await API.post(`/manufacturers/admin/edit/${this.props.match.params.ManuId}/certificates${temp}`, 
        f, config)
        .then(res=>{if(res.status===201){
            alert('add new certificate')
            window.location.reload(false)
        }})
        .catch(err=>{console.log(err)})
    }
    async delCertificate (id) {
        await API.delete(`/manufacturers/admin/edit/${this.props.match.params.ManuId}/certificates?index=${id}&key=1f3ab8f7-2103-4046-9cfc-0d6cf2756602&access=admin`)
        .then(res=>{if(res.status===200){
            alert('certificate deleted')
            window.location.reload(false)
        }})
        .catch(err=>{console.log(err)})
    }
    checkError = () => {
        if(!this.state.error){
            alert('update information successfully')
            window.location.reload(false)
        }
    }
    handleSetFile = (e) => {
        const file = e.target.files[0]
        this.setState({image: file})
    }
    handleAddCert = () => {
        this.addCertificate()
    }
    handleDelCert = (id) => {
        this.delCertificate(id)
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
                    <Row>
                        <Col>
                        <Form.Group>
                            <Form.Label>Certificate Name</Form.Label>
                            <Form.Control ref={this.certName}/>
                        </Form.Group>
                        </Col>
                        <Col>
                        <Form.Group style={{display:'flex',justifyContent:'center'}}>
                            <Form.Label>Certificate Image</Form.Label>
                            <Form.File ref={this.certImage} onChange={this.handleSetFile}/>
                        </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                        <Form.Group>
                            <Form.Label>Certificate Description</Form.Label>
                            <Form.Control ref={this.certLabel} as='textarea'/>
                        </Form.Group>
                        </Col>
                        <Col>
                        <Button variant='success' onClick={this.handleAddCert}>Add Certificate</Button>
                        </Col>
                    </Row>
                    {this.state.sustainability.certificates.map((cert,i)=>{
                        return(
                            <Row style={{margin:'20px 0'}} key={i}>
                                <Col xs={6}>
                                <Form.Group key={i}>
                                    <Form.Control placeholder={cert.label} disabled as='textarea' style={{height:'fit-content'}}/>
                                </Form.Group>
                                </Col>
                                <Col xs={6}>
                                <Button variant='danger' onClick={()=>this.handleDelCert(cert.id)}>Delete Certificate</Button>
                                <div style={{display:'flex'}}>
                                <ChangeInfo id={this.props.match.params.ManuId} index={cert.id} type='name'/>
                                <ChangeInfo id={this.props.match.params.ManuId} index={cert.id} type='label'/>
                                <ChangeInfo id={this.props.match.params.ManuId} index={cert.id} type='file'/>
                                </div>
                                </Col>
                            </Row>
                        )
                    })}
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
