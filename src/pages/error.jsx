import React from 'react'
import Button from 'react-bootstrap/Button'
import { Redirect, Switch } from 'react-router-dom' 


export default class ErrorPage extends React.Component {
    constructor(){
        super()
        this.state = {
            redirect: false 
        }
    }
    setRedirect = () => {
        this.setState({redirect:true})
    }
    renderRedirect = () => {
        if(this.state.redirect){
            return(
            <Switch>
                <Redirect to='/'/>
            </Switch>
            )}
    }
    render(){
        return(
            <div id='error' style={{display:'flex', justifyContent:'center',alignItems:'center',padding:'50vh',flexDirection:'column'}}>
                {this.renderRedirect()}
                <h3>Oops...Cannot find the page</h3>
                <Button onClick={this.setRedirect} className='btn-darkgreen'>Go back to home</Button>
            </div>
        )
    }
}