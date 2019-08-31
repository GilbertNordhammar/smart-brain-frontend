import React, { Component } from 'react'
import BorderBox from '../BorderBox/BorderBox'
import PopUpBox from '../PopUpBox/PopUpBox'
import 'animate.css'

class SignIn extends Component {
    constructor() {
        super()
        this.state = {
            email: '',
            password: '',
            alertBox: {
                visible: false,
                text: ''
            }
        }
    }

    displayAlertBox = (text) => {
        this.setState({alertBox: {visible: true, text: text}})

        setTimeout(() => {
            this.setState({alertBox: {visible: false, text: text}})
        }, 5000)
    }
    
    handleSubmit = (event) => {
        event.preventDefault()
        fetch('https://gilbert-smart-brain.herokuapp.com/signin', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password
            })
        })
        .then(response => response.json())
        .then(data => {
            if (typeof(data) === 'object') {
                this.props.onSuccesfulSignIn(data)
                this.props.onRouteChange('home')
            } else {
                this.displayAlertBox(data)
            }
        }).catch(error => {
            console.log(error)
        })
    }

    handleInputChange = (event) => {
        event.preventDefault();
        this.setState({[event.target.name]: event.target.value})
    }

    render() {
        const { onRouteChange } = this.props

        return (
            <BorderBox>
                <form onSubmit={this.handleSubmit} className="measure center pa3 pl6 pr6">
                    <fieldset className="ba b--transparent ph0 mh0">
                        <legend className="f4 fw6 ph0 mh0">Sign In</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6">Email</label>
                            <input onChange={this.handleInputChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email"/>
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                            <input onChange={this.handleInputChange} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"/>
                        </div>
                    </fieldset>
                    <div className="">
                        <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Sign in" />
                    </div>
                    <div className="lh-copy mt3">
                        <a onClick={() => onRouteChange('register')} href="#0" className="f6 link dim black db">Register</a>
                    </div>
                </form>
                <PopUpBox text={this.state.alertBox.text} display={this.state.alertBox.visible}/>
            </BorderBox>
        )
    }
}

export default SignIn;