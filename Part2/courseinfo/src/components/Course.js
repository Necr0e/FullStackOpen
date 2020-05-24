import React from 'react'

const Header = ({name}) => {
    return (
        <h1>{name}</h1>
    )
}

const Part = ({part}) => {
    const {name, exercises} = part
    return (
        <p>{name} {exercises}</p>
    )
}
const Course = ({course}) => {
    const {name, parts} = course
    return (
        <div>
            <Header name={name}/>
            {parts && parts.map(part => <Part key={part.id} part={part}/>)}
        </div>
    )
}

export default Course