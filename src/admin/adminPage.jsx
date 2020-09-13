import React, {Component} from 'react' 
import API from '../utils/API'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { config } from '../utils/config'

export default class AdminPage extends Component {
    constructor(){
        super()
        this.state = {
            manufacturers: []
        }
    }
    async getManufromDB (){
        await API.get('/manufacturers/all',config)
        .then(res=>
            {console.log(res.data)
                this.setState({manufacturers: res.data.manufacturers})})
        .catch(err=>console.log(err))
    }
    componentDidMount = () => {
        this.getManufromDB()
    }
    async handleClick (id) {
        console.log(id)
        await API.delete(`/manufacturers/admin/delete/${id}`,config)
        .then(res=>{if(res.status===200){
            alert("Manufacturer deleted")
            window.location.reload(false)
        }})
        .catch(err=>console.log(err))
    }
    render(){
        return(
            <div style={{padding:'40px',display:'flex',justifyContent:'center',
            flexDirection:'column', alignItems:'center'}}>
                <Button href='/admin/create-manufacturer' variant='info'>Create New Manufacturer</Button>
                {this.state.manufacturers.length === 0?<></>:
                this.state.manufacturers.map((manu, i) => {
                    return(
                        <Card style={{width:'70%'}} key={i}>
                            <Card.Header style={{display:'flex', alignItems:'flex-start',justifyContent:'space-between'}}>
                                <Card.Title>{manu.name}</Card.Title>
                                <Button variant="outline-danger" onClick={()=>this.handleClick(manu._id)} style={{margin:'0 20px'}}>Delete</Button>
                            </Card.Header>
                            <Card.Body style={{display:'flex',flexDirection:'column', alignItems:'flex-start'}}>
                                <Card.Text style={{display:'flex',flexDirection:'column',alignItems:'flex-start'}}>
                                    <li style={{listStyle:'none'}}>Published: {manu.published?'Yes':'No'}</li>
                                    <li style={{listStyle:'none'}}>Fabric Types: {manu.overview.fabricTypes}</li>
                                    <li style={{listStyle:'none'}}>Minimum: {manu.overview.minimum}</li>
                                    <li style={{listStyle:'none'}}>Pricing: {manu.overview.pricing}</li>
                                    <li style={{listStyle:'none'}}>Lead Time: {manu.overview.leadTime}</li>
                                </Card.Text>
                                <Button variant='outline-info' href={`/admin/edit/${manu._id}`} style={{width:'fit-content'}} info={manu}>Edit</Button>
                            </Card.Body>
                        </Card>
                    )
                })}
            </div>
        )
    }
}