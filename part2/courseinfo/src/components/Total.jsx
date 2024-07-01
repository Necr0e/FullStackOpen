const Total = ({exercises}) => {
    const total = exercises.reduce((sum, exerciseCount) => sum + exerciseCount)
    return <p><b>Total of {total} exercises.</b></p>
}

export default Total