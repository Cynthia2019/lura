import React, { Component } from 'react';
import CustomHeader from '../components/header'
import CustomFooter from '../components/footer'
import ShopSideMenu from '../components/shop-components/shopMenu'
import ShopSectors from '../components/shop-components/shopSectors'
import { RightOutlined, LeftOutlined } from '@ant-design/icons'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Switch, Redirect } from 'react-router-dom'
import * as Constants from './constants'
import '../components/shop-components/shop.css'
const types = Constants.shopFabrics
const sectors = Constants.shopSectors

export default class ShopPage extends Component {
    constructor(){
        super()
        this.state = {
            redirect: false,
            selected: [], 
            data: sectors,
            filtered: sectors,
            collapse: false,
            width: window.innerWidth
        }
    }
    componentWillMount = () => {
        this.setState({width: window.innerWidth})
    }
    handleItemClick = (e) => {
        var newSelected = [...this.state.selected]
        if(this.state.selected.includes(e.target.id.toLowerCase())){
            newSelected.pop()
            this.setState({filtered:sectors})
            //everytime when the user de-select an option, we refresh the filtered list and filter again
        }
        else{newSelected.push(e.target.id.toLowerCase())}
        window.setTimeout(function(){
            this.setState({selected:newSelected})
            this.listProducts()
        }.bind(this), 0)
        //checkbox and setState cannot be updated at the same time, so we need a setTimeout to wait for setState
        //dirty solution
    }
    listProducts = () => {
        if(this.state.selected.length !== 0){
            var filtered = [...this.state.filtered]
            this.state.selected.forEach(tag=>{
                filtered=filtered.filter(item=>item.tags.includes(tag))
            })
            console.log('filtered', filtered)
            this.setState({filtered:filtered})
        } else {
            this.setState({filtered:sectors})
        }
    }
    renderRedirect = () => {
        if(this.state.redirect){
            return(
                <Switch>
                    <Redirect from='/shop' to='/fabric-finder'/>
                </Switch>
            )
        }
    }
    render(){
        console.log(this.state.width)
        return( 
            <div>
                {this.renderRedirect()}
                <CustomHeader/>
                <div className='shop-main-content'>
                    <Row>
                        <Col className='side-filter' xs={this.state.collapse?1:9} md={3} style={this.state.collapse?{left:'-100%',transition:'0.5s'}:{}}>
                            <ShopSideMenu selected={this.state.selected} handleItemClick={this.handleItemClick}/>
                        </Col>
                        <div style={this.state.collapse?{transition:'0.5s'}:{}} className='shop-control-collapse-col'>
                            <Button onClick={()=>{this.setState({collapse:!this.state.collapse})}} className='control-collapse'>{this.state.collapse?<RightOutlined />:<LeftOutlined />}</Button>
                        </div>
                        <Col className='shop-main' xs={7} md={9} style={(this.state.collapse)?{transition:'0.5s'}:this.state.width>800?{}:{display:'none'}}>
                            <div style={{display:'flex',justifyContent:'center',flexDirection:'column',alignItems:'center',margin:'30px'}}>
                                <p>Need helping finding a fabric to suit your needs? Take our free fabric matching quiz!</p>
                                <Button onClick={()=>{this.setState({redirect:true})}} className='btn-darkgreen'>START CONSULTATION</Button>
                            </div>
                            <h1 style={{fontWeight:300}}>Fabric</h1>
                            <div className='shop-sectors' style={{margin:'2vw'}}>
                                <ShopSectors data={this.state.filtered}/>
                            </div>
                        </Col>
                    </Row>
                </div>
                <div style={{position:'relative',top:'120px'}}>
                    <CustomFooter/>
                </div>
            </div>
        )
    }
}


/*
                            <Breadcrumb>
                                <Breadcrumb.Item href='/shop'>Shop</Breadcrumb.Item>
                                <Breadcrumb.Item href='/shop'>Fabrics</Breadcrumb.Item>
                                {this.state.selected.length===0?<></>:this.state.selected.map(item=>{
                                    return(
                                        <Breadcrumb.Item href={`#${item}`} key={item}>{item}</Breadcrumb.Item>
                                    )
                                })}
                            </Breadcrumb>
*/
