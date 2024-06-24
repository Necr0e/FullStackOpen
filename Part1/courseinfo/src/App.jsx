
const Header = ({course}) => {
    return (
        <h1>{course}</h1>
    )
}

const Content = ({courses, exercises}) => {
    return (
        <div>
            <Part name={courses.part1} exercises={exercises.exercises1} />
            <Part name={courses.part2} exercises={exercises.exercises2} />
            <Part name={courses.part3} exercises={exercises.exercises3} />
        </div>
    )
}

const Part = (part) => {
        return <p>{part.name} {part.exercises}</p>
}
const Total = ({exercises}) => {
    return (
        <p>Total number of exercises: {exercises.exercises1 + exercises.exercises2 + exercises.exercises3}</p>
    )
}
const App = () => {
    const course = 'Half Stack application development'
    const part1 = 'Fundamentals of React'
    const exercises1 = 10
    const part2 = 'Using props to pass data'
    const exercises2 = 7
    const part3 = 'State of a component'
    const exercises3 = 14

    return (
        <div>
            <Header course={course} />
            <Content courses={{ part1, part2, part3 }} exercises={{exercises1, exercises2, exercises3}}/>
            <Total exercises={{ exercises1, exercises2, exercises3}} />
        </div>
    )
}

export default App
