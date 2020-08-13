import React, { Component } from 'react';
import CustomHeader from '../components/header'
import CustomFooter from '../components/footer'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import ShopSectors from '../components/shop-components/shopSectors'
import API from '../utils/API'
import { Switch, Redirect, Link } from 'react-router-dom';
import * as Constants from './constants'
import './myFabrics.css'

const config = {
    headers: {
        "Access-Control-Allow-Origin": "https://localhost:3000",
        'Content-Type': 'application/json'
    },
    withCredentials:true
}

const sectors = Constants.shopSectors

export default class FabricMatchings extends Component {
  constructor(props){
      super(props)
      this.state = {
          show: false,
          firstName: null,
          lastName: null,
          filtered: sectors,
      }
  }
  componentDidMount = () => {
      this.getUserFromDB()
  }
  async getUserFromDB() {
      await API.get(`/home`, {withCredentials:true})
      .then(res=>{
          if(res.data===[]){this.setState({data: 'no-user'})}
          this.setState({
              firstName: res.data.firstName,
              lastName: res.data.lastName,
          })
      })
      .catch(err=>console.log(err))
  }

  render(){
      return(
        <div>
          <CustomHeader />
          <div className="matchings-main" style={{backgroundColor:'#FBF6F2', padding:'5vw',minHeight:'90vh'}}>
            <Row className='matchWrap'>
              <Col md={3} className="matchSidebar">
                  <div className="avatar-line" style={{display:'flex',justifyContent:'flex-start',flexDirection:'row', alignItems:'flex-start', height:'15vh'}}>
                    <div style={{display:'flex',justifyContent:'center',flexDirection:'row', alignItems:'center'}}>
                      <div className="avatar" style={{borderRadius:'50px', backgroundColor:'#4A645C',color:"white", width:'80px', height:'80px',display:'flex',justifyContent:'center',alignItems:'center'}}>
                          <span style={{fontSize:'35px'}}>{this.state.firstName?this.state.firstName[0]:""}{this.state.lastName?this.state.lastName[0]:""}</span>
                      </div>
                      <div style={{color:'#4A645C', marginLeft:'20px'}}>MY ACCOUNT</div>
                    </div>
                  </div>
                  <p class='matchtext'>All saved projects</p>
                  <div class='matches'>
                    <ul id='matchesList'>
                      <li> Gold, Silk, Long-Sleeve Top</li>
                    </ul>
                  </div>
              </Col>
              <Col md={9}>
                <p class="matchtitle">Gold, Silk, Long-Sleeve Top</p>
                <div>
                  <ShopSectors data={this.state.filtered}/>
                </div>
              </Col>
            </Row>
          </div>
          <CustomFooter footer={'second'} />
        </div>
      )
  }
}
