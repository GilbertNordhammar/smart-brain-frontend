import React from 'react'

const Border = (props) => {
    return (
        <article className="br2 ba dark-gray b--black-10 mv4 mw6 center shadow-4">
            {props.children}
        </article>
    )
}

export default Border;