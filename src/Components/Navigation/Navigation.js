import React from 'react'

const Navigation = ({ onRouteChange, route }) => {
    let items;

    switch(route) {
        case 'register':
            items = <p onClick={() => onRouteChange('signin')} className='f3 link dim black underline pa3 pointer'>Sign in</p>
            break;
        case 'home':
            items = <p onClick={() => onRouteChange('signin')} className='f3 link dim black underline pa3 pointer'>Logout</p>
            break;
        default:
            items = <p onClick={() => onRouteChange('register')} className='f3 link dim black underline pa3 pointer'>Register</p>
    }

    return (
        <div className='flex justify-end'>
            {items}
        </div>
    )
}

export default Navigation;