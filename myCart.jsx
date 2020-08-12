import React, { Component } from 'react';
import CustomHeader from '../components/header'
import img_1 from '../img/NAMIHOFFMAN_112419FABRIC-19.png'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import {PageView, initGA} from '../components/Tracking';
import Button from 'react-bootstrap/Button'
import './myCart.css'

export default class MyCart extends Component {
    constructor(props){
        super(props)
        this.state = {
            quantity: 1,
            display: true, 
            autoplay: false,
            min: 0,
        }
    }
    componentDidMount() {
        initGA('UA-171248811-1');
        PageView();
     }  
    

    //quantity change button
    IncrementQuan = () => {
        this.setState(prevState => {
          if(prevState.quantity < 9) {
            return {
              quantity: prevState.quantity + 1
            }
          } else {}
        });
    }
    DecreaseQuan = () => {
      this.setState(prevState => {
        if(prevState.quantity > 0) {
          return {
            quantity: prevState.quantity - 1
          }
        } else {}
      });
    }
    


    render(){
        window.addEventListener('scroll', this.handleScroll);
        return(
            <div >
                <CustomHeader/>
                <div className="main-text" style={{position:'relative', display:'flex', justifyContent:'center'}} >
                    <p 
                    style={{ color:'#357F59', width:'63%', position:'fixed', zIndex:-1}}>
                        MY CART </p>
                </div>
                <Row >     
                    <Col md = {8}>
                        <Row>
                            <Col md = {1}></Col>
                            <Col md = {4}>
                            <div className = "items">
                            <div className="summary" style={{fontWeight: 'bold', fontSize:'20px'}}>Items</div>
                            <hr></hr>
                            <span>Deep brown gold silk: $10</span>
                            
                            <div id="Color_Brown_Size_Sample_Qty_db">
                                <span>Color: Brown<br/>Size: Swatch<br/>Quantity:</span>
                                <div>
                                <button onClick = {this.IncrementQuan}>+</button>
                                <input type="text" className="number" value={this.state.quantity}></input>
                                <button onClick = {this.DecreaseQuan}>-</button>
                                </div>
                            </div>
                            </div>
                            </Col>
                            <Col md = {4}>
                                <br></br>
                            <img src={img_1} alt='fabric' style={{LineImage}}></img>
                            </Col>
                            <Col md = {1}></Col>
                        </Row>
                    </Col>             
                    <Col md={3}>
                        <div className="orderSummary">
                            <div className="summary" style={{fontWeight: 'bold', fontSize:'20px'}}>Order Summary</div>
                            <hr />
                            <p style={{padding:'0 20px', fontSize:'18px'}}>Subtotal: $10<br/> Total: $10</p>
                            <hr />
                            <Button className='btn-darkgreen'type="submit" 
                            href='/blog'>GO TO CHECKOUT
                            </Button>
                        
                        </div>
                    </Col>
                </Row>
                </div>
        )
    }
}

const LineImage = {
    width: '50 px', 
    height: '50 px',
    position: 'fixed', 
}