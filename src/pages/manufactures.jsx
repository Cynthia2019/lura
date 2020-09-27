import React, { Component } from 'react';
import CustomHeader from '../components/header'
import SideMenu  from '../components/manuMenu'
import ManuCard from '../components/manuCard'
import Button from 'react-bootstrap/Button'
import lineImage from '../img/vickholius-nugroho-jt6QxZwSOCQ-unsplash.jpg'
import { RightOutlined, LeftOutlined } from '@ant-design/icons'
import API from '../utils/API'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import './manufactures.css'
import Spinner from 'react-bootstrap/Spinner'
import { config } from '../utils/config'

const temp = '?key=1f3ab8f7-2103-4046-9cfc-0d6cf2756602&access=normal'

export default class Manufacture extends Component {
    constructor(){
        super()
        this.state={
            loading:true,
            manufacturers: [],
            saved: [],
            collapse: false,
            width: window.innerWidth,
            user:false
        }
    }
    async getUserFromDB () {
        await API.get(`/user`, config)
        .then(res=>{
                if(res.data.access) {
                    this.setState({user:true})
                    this.getSavedfromDB()
                    this.getManufacturerfromDB()
                } else {
                    this.setState({
                        loading:false, 
                    })
                }
            }
        ).catch(err=>console.log(err))
    }
    async getManufacturerfromDB () {
        await API.get(`/manufacturers/all`, config)
        .then(res => {
            console.log(res.data)
            this.setState({
                loading:false,
                manufacturers:res.data.manufacturers
            })
           })
        .catch(err=>console.log(err))
    }
    getSavedfromDB = () => {
        API.get(`/manufacturers/save`,config)
        .then(res=>{console.log('saved')
            this.setState({saved:res.data.saved})})
        .catch(err=>console.log(err))
    }
    componentDidMount = () => {
        this.getUserFromDB()
    }
    componentWillMount = () => {
        if(this.state.collapse){
            document.body.style.backgroundColor = 'rgba(0,0,0,0.65)'
        } else {
            document.body.style.backgroundColor = null
        }
    }
    render(){
        return(
            <div>
                <div>
                    <CustomHeader />
                </div>
                <div className='database-title'>
                    <div className="image-text" style={ImageText}>Supplier Directory</div>
                </div>
                <Row style={{textAlign:'left',margin:'0',backgroundColor:'#FEF9F6',flexDirection:'row'}} className='database-content'>
                    <Col md={4} xs={this.state.collapse?1:9} className='side-menu' style={this.state.collapse?{left:'-100%',transition:'0.5s'}:{}}>
                        <SideMenu />
                    </Col>
                    <Col xs={3} md={1} style={this.state.collapse?{transition:'0.5s',left:'-10%'}:{}} className='control-collapse-col'>
                        <Button onClick={()=>{this.setState({collapse:!this.state.collapse})}} className='control-collapse'>{this.state.collapse?<RightOutlined />:<LeftOutlined />}</Button>
                    </Col>
                    <Col xs={7} className='database-content-main' style={(this.state.collapse)?{transition:'0.5s'}:this.state.width>800?{}:{display:'none'}}>
                        {this.state.loading?<Spinner animation="border" variant="success" size='lg' style={{marginTop:'30%'}}/>:this.state.manufacturers.length!== 0?this.state.manufacturers.map((manu, i)=>{
                            return(
                                <ManuCard info={manu} saved={this.state.saved} key={i}/>
                            )
                        }):<div style={{marginTop:'30%'}}>
                            <h3>Please login first to see the supplier information.</h3>
                        </div>}
                    </Col>
                </Row>
            </div>
        )
    }
}

const ImageText = {
    backgroundImage: `url(${lineImage})`,
    width: '100vw', 
    height: '90px',
    position: 'fixed', 
    zIndex: -1, 
    color:'white',
    fontWeight: 'bold'
}
/**
 * 
 *     async getManufacturerfromDB () {
        await API.get('https://lura-services.herokuapp.com/manufacturers/all', config)
        .then(res => {this.setState({manufacturers:res.data.manufacturers})})
        .catch(err=>console.log(err))
    }
 */