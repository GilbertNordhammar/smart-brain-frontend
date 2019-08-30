import React, { Component } from 'react';
import styles from './ImageLinkForm.module.css'

class ImageLinkForm extends Component {
    constructor() {
        super();
        this.state = {
            imageURL : ""
        }
    }

    onInputFieldUpdated = (event) => {
        this.setState( { imageURL: event.target.value } )
    }

    onButtonPressed = (event) => {
        const { onButtonSubmit } = this.props;
        if(onButtonSubmit != null) {
            onButtonSubmit(this.state.imageURL)
        }
    }
    
    render() {
        return (
            <div className='tc'>
                <p className="mt3 tc f4">This Magic Brain will detect human faces in your pictures. Give it a try!</p>
    
                <div className={`flex justify-center pa3 ${styles.background}`}>
                    <input className='w-70 f4 ph0' onChange={this.onInputFieldUpdated}></input>
                    <button className='white bg-red grow pt1 ph3 f3 link ph0' onClick={this.onButtonPressed}>Detect</button>
                </div>
            </div>
        );   
    }
}

export default ImageLinkForm;