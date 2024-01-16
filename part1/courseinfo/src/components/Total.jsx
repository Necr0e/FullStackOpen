const Total = (props) => {
    let total = 0
    props.parts.forEach(part => {
        total += part.exercises
    })
    return (
        <p>
            Total number of exercises: {total}
        </p>
    )
}

export default Total;