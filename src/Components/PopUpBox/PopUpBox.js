import React from 'react'
import 'animate.css'

const PopUpBox = ({display, text, background, width}) => {
    text = text !== undefined ? text : 'Popup box';
    display = display !== undefined ? display : false;
    background = background !== undefined ? background : 'rgb(209, 174, 17)'
    width = width !== undefined ? width : '70%'
    
    return (
        display 
        ? <div 
            color='warning' 
            className={`br2 ba b--black-10 center shadow-4 pa3 mb3 animated fadeIn center`} 
            style={{background: background, width: width}}
            >
            {text}
        </div>
        : <div></div>
    )
}

export default PopUpBox;