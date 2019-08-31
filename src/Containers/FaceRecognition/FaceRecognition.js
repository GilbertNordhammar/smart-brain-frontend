import React, { Component } from 'react';
import styles from './FaceRecognition.module.css'
import Loader from 'react-spinners/HashLoader';
import isImageUrl from 'is-image-url'

class FaceRecognition extends Component {
    constructor() {
        super();
        this.state = {
            faceBoxes: [],
            loading: false,
            imageLoaded: false,
            errorMessage: {
                display: false,
                text: ''
            }
        }
    }

    calculateFaceBoxes = (faceRegions) => {
        return faceRegions.map(region => {
            const boundingBox = region.region_info.bounding_box
            const inputImage = document.getElementById('inputimage')
            const width = inputImage.width;
            const height = inputImage.height;
            return {
                leftCol: boundingBox.left_col * width,
                topRow: boundingBox.top_row * height,
                rightCol: width - (boundingBox.right_col * width),
                bottomRow: height - (boundingBox.bottom_row * height)
            }
        })
    }

    setSearchState = ({loading, faceBoxes = [], errorText = ''}) => {
        const errorMessage = {
            display: (errorText !== ''),
            text: errorText
        }

        this.setState({
            loading,
            faceBoxes,
            errorMessage
        })
    }

    searchForFace = async (imageUrl, onSearchComplete) => {
        try {
            this.setSearchState({loading: true, faceBoxes: []})

            if (isImageUrl(imageUrl)) {
                const response = await fetch('https://gilbert-smart-brain.herokuapp.com/faceRecognition', {
                    method: 'post',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        imageUrl: imageUrl
                    })
                })
                const faceData = await response.json()

                const faceRegions = faceData.outputs[0].data.regions

                if (faceRegions !== undefined) {
                    this.setSearchState({loading: false, faceBoxes: this.calculateFaceBoxes(faceRegions)})
                } else {
                    this.setSearchState({loading: false, errorText: 'No faces could be detected!'})
                }

            } else {
                this.setSearchState({loading: false, errorText: 'The input has to be an image URL!'})
            }
        } catch (error) {
            console.log(error)
            this.setSearchState({loading: false, errorText: 'Unexpected error! Please try again'})
        }

        if (this.props.onFaceSearchCompleted !== undefined) {
            this.props.onFaceSearchCompleted()
        }
    }

    handleImageLoaded = () => {
        this.setState({imageLoaded: true})
    }

    handleImageErrored = () => {
        this.setState({imageLoaded: false})

    }

    render() {
        const { imageUrl } = this.props
        const { loading, faceBoxes, errorMessage, imageLoaded } = this.state

        const loaderPositionAdjustment = imageLoaded ? '' : 'top-1'

        return (
            <div className='center ma'>
                <div className={styles.contentBlock}>
                    <div className='flex justify-center items-center tc'>
                        <img 
                            id='inputimage' alt='' 
                            src={imageUrl} width='500px' 
                            onLoad={this.handleImageLoaded}
                            onError={this.handleImageErrored}
                            height='auto'>   
                         </img>
                        <div className={`absolute ${loaderPositionAdjustment}`}>
                            <Loader
                                sizeUnit={"px"}
                                size={150}
                                color={'#E6C193'}
                                loading={loading}
                            />
                        </div>
                    </div>
                    {
                        faceBoxes.map((box, index) => {
                            return <div key={index} className={styles.boundingBox} style={{ top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol }} />
                        })
                    }
                    {
                        errorMessage.display &&
                        <p className='tc f3 mb5 white'>{errorMessage.text}</p>
                    }
                </div>
            </div>
        );
    }
}

export default FaceRecognition;