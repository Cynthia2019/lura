import React, { Component } from 'react';
import CustomHeader from '../components/header'
import CustomFooter from '../components/footer'
import lineImage from '../img/vickholius-nugroho-jt6QxZwSOCQ-unsplash.jpg'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Menu, Checkbox } from 'antd';
import { Layout } from 'antd';
import './manufactures.css'

const { Header, Footer, Sider, Content } = Layout;

const { SubMenu } = Menu;

const options1 = ["Natural", 'Cotton','Silk','Linen',"Jute",'Hemp',"Bamboo","Lyocell","Viscose","All Natural"]
const options2 = ["Animal",'Wool', "Cashmere", "All Animal"]
const options3 = ["Synthetic",'Polyester', 'PE/PET', 'Nylon', 'All Synthetic']
const options4 = ["Recycled",'All Recycled']
const options5 = ["Deadstock",'All Deadstock']
const options = [options1, options2, options3, options4, options5]
const types = ['Jersey/Knit', 'Silk/Satin','Tweed','Velvet','Cotton','Corduroy','Denim','Faux Leather/Suede','Linen','Wool Woven','Athletic Material','Swimsuit Material', 'All Fabric Types']
const minimums = ['< 100 yards', '200 - 400', '400 - 700', '700 - 1000', '1000+', "All Minimun Req."]
const prices = ['< $5', '$5 - $10', "$10 - $30", "$30 - $50", "$50+", "All Prices"]
const weights = ['< 50 gsm', "50 - 100 gsm", "100 - 200 gsm", "200 - 300 gsm", '300 - 400 gsm', "400 - 500 gsm", "500+ gsm", "All Weights"]
export default class Manufacture extends Component {
    handleClick = e => {
        console.log('click ', e);
      };
    render(){
        return(
            <div>
                <Layout style={{ minHeight: '100vh' }}>
                    <Header><CustomHeader /></Header>
                    <div style={{position:'relative', top:'120px', zIndex:1000}}>
                        <div>
                            <div className="image-text" style={ImageText}>MANUFACTURER DATABASE</div>
                        </div>
                    </div>
                    <Layout style={{position:'relative', top:'210px', height:'fit-content', textAlign:'left'}}>
                        <Sider width="30%" style={{border:'1px solid rgba(0,0,0,0.25)', boxShadow:'rgba(0, 0, 0, 0.25) 3px 0px 5px 0.5px', 
                    backgroundColor:'white'}}>
                            <h3 style={{padding:'40px 40px 20px 50px', fontSize:'30px'}}>Filter By</h3>
                            <Menu mode="inline" style={{ height: '100%', borderRight: 0}}>
                                <SubMenu key='composition' title={<span style={{fontSize:'25px', padding:'10px 0'}}>Fabric Composition</span>} mode="inline" style={{padding:'20px 0'}}>
                                    {options.map((list,i)=>{return(
                                        <Menu.ItemGroup key={`g${i}`} title={<p style={{paddingTop:'20px', fontSize:'20px'}}>{list[0]}</p>}>
                                            {list.slice(1).map((option, i)=>{
                                                return(
                                                <Menu.Item key={i} style={{paddingLeft:0, fontSize:'20px', display:'flex'}}>
                                                            <label class="checkbox-label">
                                                                <input type="checkbox"/>
                                                                <span class="checkbox-custom "></span>
                                                            </label>
                                                            <p>{option}</p>
                                                </Menu.Item>
                                                )
                                            })}
                                        </Menu.ItemGroup>
                                    )})}
                                </SubMenu>
                                <SubMenu key='type' title={<span style={{fontSize:'25px'}}>Fabric Type</span>}
                                style={{padding:'20px 0'}} mode='inline'>
                                    {types.map((option,i)=>{return(
                                        <Menu.Item key={i} style={{paddingLeft:0, fontSize:'20px', display:'flex'}}>
                                                    <label class="checkbox-label">
                                                        <input type="checkbox"/>
                                                        <span class="checkbox-custom "></span>
                                                    </label>
                                                    <p>{option}</p>
                                        </Menu.Item>
                                        )
                                    })}
                                </SubMenu>
                                <SubMenu key='minimums' title={<span style={{fontSize:'25px'}}>Minimums</span>} mode="inline" 
                                style={{padding:'20px 0'}} mode='inline'>
                                    {minimums.map((option,i)=>{return(
                                        <Menu.Item key={i} style={{paddingLeft:0, fontSize:'20px', display:'flex'}}>
                                                    <label class="checkbox-label">
                                                        <input type="checkbox"/>
                                                        <span class="checkbox-custom "></span>
                                                    </label>
                                                    <p>{option}</p>
                                        </Menu.Item>
                                        )
                                    })}
                                </SubMenu>
                                <SubMenu key='prices' title={<span style={{fontSize:'25px'}}>Price Per Yard</span>} mode="inline" 
                                style={{padding:'20px 0'}} mode='inline'>
                                    {prices.map((option,i)=>{return(
                                        <Menu.Item key={i} style={{paddingLeft:0, fontSize:'20px', display:'flex'}}>
                                                    <label class="checkbox-label">
                                                        <input type="checkbox"/>
                                                        <span class="checkbox-custom "></span>
                                                    </label>
                                                    <p>{option}</p>
                                        </Menu.Item>
                                        )
                                    })}
                                </SubMenu>
                                <SubMenu key='weights' title={<span style={{fontSize:'25px'}}>Weights</span>} mode="inline" 
                                style={{padding:'20px 0'}} mode='inline'>
                                    {weights.map((option,i)=>{return(
                                        <Menu.Item key={i} style={{paddingLeft:0, fontSize:'20px', display:'flex'}}>
                                                    <label class="checkbox-label">
                                                        <input type="checkbox"/>
                                                        <span class="checkbox-custom "></span>
                                                    </label>
                                                    <p>{option}</p>
                                        </Menu.Item>
                                        )
                                    })}
                                </SubMenu>
                            </Menu>
                        </Sider>
                        <Content>Content</Content>
                    </Layout>
                </Layout>
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
    fontSize: '65px',
    fontWeight: 'bold'
}