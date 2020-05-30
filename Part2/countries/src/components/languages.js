import React from 'react'

const Languages = ({items}) => {
    const rows = () => items.map(item => <li key={item.name}> {item.name}</li>)
    return (
        <ul>
            {rows()}
        </ul>
    )
}

export default Languages