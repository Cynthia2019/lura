import React from 'react' 
import Button from 'react-bootstrap/Button'
import { Switch, Redirect } from 'react-router-dom'

export default class EmailPage extends React.Component {
    constructor(){
        super()
        this.state = {
            redirect:false,
            email: null, 
            state: null
        }
    }
    readURL = () => {
        var url = window.location.search; 
        var parts = url.substring(1).split('&');
        this.setState({email: parts[0], state:parts[1]})
    }
    handleClick = () => {
        this.setState({redirect:true})
    }
    componentWillMount = () => {
        this.readURL()
    }
    renderRedirect = () => {
        if(this.state.redirect){
            return(
                <Switch>
                    <Redirect to='https://lura-services.herokuapp.com/login'/>
                </Switch>
            )
        }
    }
    render(){
        return(
            <div>
                {this.renderRedirect()}
                <h3>Please check your inbox at <a href={this.state.email}>{this.state.email}</a> for a verification link.</h3>
                <h3>Click Verify Your Account to continue.</h3>
                <Button variant='link' onClick={this.handleClick}>Next</Button>
            </div>
        )
    }
}