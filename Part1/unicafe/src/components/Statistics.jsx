const Statistics = ({good, neutral, bad}) => {
    const total = good + neutral + bad
    if (total === 0) {
        return <div>No feedback given</div>
    }
    const average = () => (good - bad) / total
    const positive = () => (good / total) * 100 + '%'
    return (
        <table>
            <tbody>
            <StatisticLine text='good' value={good} />
            <StatisticLine text='neutral' value={neutral} />
            <StatisticLine text='bad' value={bad} />
            <StatisticLine text='total' value={total} />
            <StatisticLine text='average' value={average()} />
            <StatisticLine text='positive' value={positive()} />
            </tbody>
        </table>
    )}

const StatisticLine = ({text, value}) => {
    return (
        <tr>
            <td>{text}</td>
            <td>{value}</td>
        </tr>
    )
}

export default Statistics