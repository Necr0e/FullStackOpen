import React from 'react'

const Filter = ({query, handleFilterChange}) => {
    return (
        <input value={query}
               onChange={handleFilterChange}/>
    )
}

export default Filter