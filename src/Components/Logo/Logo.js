import React from 'react'
import Tilt from 'react-tilt'
import brain from './brain.png'
import styles from './Logo.module.css'

const Logo = () => {
    return (
        <div className='ma4 mt0'>
            <Tilt className={`Tilt br2 shadow-1 ${styles.background}`} options={{ max: 55 }} style={{ height: 150, width: 150 }} >
                <div className="Tilt-inner"><img alt='logo' width='100px' style={{paddingTop: '20px'}}src={brain}/></div>
            </Tilt>
        </div>
    )
}

export default Logo;