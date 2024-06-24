
const Header = ({name}) => {
    return (
        <h1>{name}</h1>
    )
}

const Content = ({ parts }) => {
    return parts.map(part => <Part key={part.name} name={part.name} exercises={part.exercises}/>)}

const Part = ({name, exercises}) => {
        return <p>{name}: {exercises}</p>
}
const Total = ({parts}) => {
    let sum = 0
    parts.forEach(part => {
        sum += part.exercises
    })
    return <p>Total number of exercises: {sum}</p>
}
const App = () => {
    const course = {
        name: 'Half Stack application development',
        parts: [
            {
                name: 'Fundamentals of React',
                exercises: 10
            },
            {
                name: 'Using props to pass data',
                exercises: 7
            },
            {
                name: 'State of a component',
                exercises: 14
            }
        ]
    }
    return (
        <div>
            <Header name={course.name} />
            <Content parts={course.parts}/>
            <Total parts={course.parts} />
        </div>
    )
}

export default App
