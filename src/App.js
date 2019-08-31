import React, { Component } from 'react';
import Particles from 'react-particles-js'
import Navigation from './Components/Navigation/Navigation';
import ImageLinkForm from './Containers/ImageLinkForm/ImageLinkForm'
import Logo from './Components/Logo/Logo'
import Rank from './Components/Rank/Rank'
import FaceRecognition from './Containers/FaceRecognition/FaceRecognition'
import SignIn from './Components/SignIn/SignIn'
import Register from './Components/Register/Register'
import './App.css'
import 'tachyons'

const particleOptions = {
  "particles": {
    "number": {
      "value": 20,
      "density": {
        "enable": true,
        "value_area": 500
      }
    },
    "color": {
      "value": "#cdb4b4"
    },
    "shape": {
      "type": "circle",
      "stroke": {
        "width": 3,
        "color": "#000409"
      },
      "polygon": {
        "nb_sides": 8
      },
      "image": {
        "src": "img/github.svg",
        "width": 100,
        "height": 100
      }
    },
    "opacity": {
      "value": 0.5,
      "random": false,
      "anim": {
        "enable": false,
        "speed": 1,
        "opacity_min": 0.1,
        "sync": false
      }
    },
    "size": {
      "value": 4.008530152163803,
      "random": true,
      "anim": {
        "enable": false,
        "speed": 40,
        "size_min": 0.1,
        "sync": false
      }
    },
    "line_linked": {
      "enable": true,
      "distance": 150,
      "color": "#ffffff",
      "opacity": 0.4,
      "width": 1
    },
    "move": {
      "enable": true,
      "speed": 6,
      "direction": "none",
      "random": false,
      "straight": false,
      "out_mode": "out",
      "bounce": false,
      "attract": {
        "enable": false,
        "rotateX": 600,
        "rotateY": 1200
      }
    }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": {
        "enable": false,
        "mode": "grab"
      },
      "onclick": {
        "enable": false,
        "mode": "push"
      },
      "resize": true
    },
    "modes": {
      "grab": {
        "distance": 400,
        "line_linked": {
          "opacity": 1
        }
      },
      "bubble": {
        "distance": 400,
        "size": 40,
        "duration": 2,
        "opacity": 8,
        "speed": 3
      },
      "repulse": {
        "distance": 200,
        "duration": 0.4
      },
      "push": {
        "particles_nb": 4
      },
      "remove": {
        "particles_nb": 2
      }
    }
  },
  "retina_detect": true

}

const initialState = {
  imageUrl: '',
  route: 'signin',
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
}

class App extends Component {

  constructor() {
    super()
    this.state = initialState
    this.faceRecognition = React.createRef();
  }

  handleURLSubmitted = (imageUrl) => {
    this.setState({ imageUrl: imageUrl })
    this.faceRecognition.current.searchForFace(imageUrl)
  }

  incrementEntries = async () => {
    try {
      const response = await fetch('https://gilbert-smart-brain-api.herokuapp.com/image', 
      {
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          id: this.state.user.id
        })
      })
      const entries = await response.json()
      
      this.setState(prevState => {
        const updatedUser = Object.assign({}, prevState.user)
        updatedUser.entries = entries
        return {user: updatedUser}
      })
    } catch (error) {
      console.log(error)
    }
  }

  handleRouteChanged = (newRoute) => {
    const { route } = this.state

    if (route === 'home' && newRoute === 'signin') {
      this.setState(initialState)
    }

    this.setState({ route: newRoute })
  }

  loadUser = (loadedUser) => {
    this.setState({ user: loadedUser })
  }

  render() {
    const { imageUrl, route, user } = this.state
    const handleRouteChanged = this.handleRouteChanged;

    let pageContent;
    switch (route) {
      case 'signin':
        pageContent = <SignIn onRouteChange={handleRouteChanged} onSuccesfulSignIn={this.loadUser}/>
        break
      case 'register':
        pageContent = <Register onRouteChange={handleRouteChanged} onUserRegistered={this.loadUser} />
        break
      case 'home':
        pageContent = (
          <div className="App">
            <Logo />
            <Rank nameOfUser={user.name} entries={user.entries} />
            <ImageLinkForm onButtonSubmit={this.handleURLSubmitted} />
            <FaceRecognition 
              ref={this.faceRecognition} 
              imageUrl={imageUrl}
              onFaceSearchCompleted={this.incrementEntries} 
              />
          </div>);
        break;
        default:
          break;
    }

    return (
      <div className="App">
        <Particles className='particles' params={particleOptions} />
        <Navigation onRouteChange={handleRouteChanged} route={route} />
        {pageContent}
      </div>
    )
  }
}

export default App;
