import React from 'react' 
import Button from 'react-bootstrap/Button'

export default class Example extends React.Component {
    render(){
        return(
            <div>
                <h3>Please check your email at <a href="foo@example.com">foo@example.com</a> for a verification link.</h3>
                <h3>Click Verify Your Account to continue.</h3>
                <Button variant='link'>Next</Button>
            </div>
        )
    }
}