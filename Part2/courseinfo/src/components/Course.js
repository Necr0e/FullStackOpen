import React from 'react'

const Header = ({name}) => {
    return (
        <h1>{name}</h1>
    )
}
const Part = ({part}) => (
    <p>{part.name} {part.exercises}</p>
)
const Content = ({parts}) => {
    return (
        <div>
            {parts.map(part => <Part key={part.id} part={part}/>)}
        </div>
    )
}
const Total = ({parts}) => {
    const total = parts.reduce((acc, currentValue) => {
        return acc + currentValue.exercises
    }, 0)
    return (
        <b>total of {total} exercises</b>
    )
}
const Course = ({course}) => {
    const {name, parts} = course
    return (
        <div>
            <Header name={name}/>
            <Content parts={parts}/>
            <Total parts={parts}/>
        </div>
    )
}

export default Course