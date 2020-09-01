import React, { Component } from 'react';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ShopSectors from '../components/shop-components/shopSectors'
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

  render(){
      return(
            <Row className='matchWrap' style={{backgroundColor:'#FBF6F2', padding:'5vw',minHeight:'90vh'}}>
                <p class="matchtitle">Gold, Silk, Long-Sleeve Top</p>
                <div>
                  <ShopSectors data={this.state.filtered}/>
                </div>
            </Row>
      )
  }
}
