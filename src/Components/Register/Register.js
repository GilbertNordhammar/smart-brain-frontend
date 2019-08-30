import React, { Component } from 'react'
import BorderBox from '../BorderBox/BorderBox'
import PopUpBox from '../PopUpBox/PopUpBox'

class Register extends Component {
    constructor() {
        super()
        this.state = {
            name: '',
            email: '',
            password: '',
            alertBox: {
                visible: false,
                text: ''
            }
        }
    }

    displayAlertBox = (text) => {
        this.setState({ alertBox: { visible: true, text: text } })

        setTimeout(() => {
            this.setState({ alertBox: { visible: false, text: text } })
        }, 5000)
    }

    handleSubmit = (event) => {
        event.preventDefault()

        fetch('http://localhost:3001/register', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: this.state.name,
                email: this.state.email,
                password: this.state.password
            })
        })
            .then(response => response.json())
            .then(data => {
                console.log(typeof(data))
                if (typeof(data) === 'object') {
                    this.props.onUserRegistered(data)
                    this.props.onRouteChange('home')
                } else {
                    this.displayAlertBox(data)
                }
            })
            .catch(error => {
                console.log("Error: ", error)
            })
    }

    handleInputChange = (event) => {
        event.preventDefault();
        // For some reason auto-complete triggers if a password field has the name attribute 'password'. 
        // To avoid this it's explicitly named 'user_password
        if(event.target.name === 'user_password') { 
            this.setState({password: event.target.value})
        }
        this.setState({[event.target.name]: event.target.value})
    }

    render() {
        return (
            <BorderBox>
                <form 
                onSubmit={this.handleSubmit} 
                className="measure center pa3 pt4 pb4 pl6 pr6" 
                acceptCharset="utf-8"
                autoComplete='off'
                >
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0 ">
                        <legend className="ph0 mh0 fw6 f4">Register</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6">Name</label>
                            <input 
                                onChange={this.handleInputChange} 
                                className="pa2 input-reset ba bg-transparent measure hover-bg-black hover-white" 
                                type="name" 
                                name="name"
                            />
                        </div>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6">Email</label>
                            <input 
                                onChange={this.handleInputChange} 
                                className="pa2 input-reset ba bg-transparent w-100 measure hover-bg-black hover-white" 
                                type="email"
                                name='email' 
                            />
                        </div>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6">Password</label>
                            <input 
                                onChange={this.handleInputChange} 
                                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white" 
                                type='password'
                                autoComplete='new-password'
                                name='user_password'
                            />
                        </div>
                    </fieldset>
                    <div className="mt3">
                        <input 
                            className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6" 
                            type="submit" 
                            value="Register" 
                        />
                    </div>
                </form>
                <PopUpBox text={this.state.alertBox.text} display={this.state.alertBox.visible} />
            </BorderBox>
        )
    }
}

export default Register;