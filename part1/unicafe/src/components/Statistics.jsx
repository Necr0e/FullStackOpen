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
            <Statistic text='good' value={good}/>
            <Statistic text='neutral' value={neutral}/>
            <Statistic text='bad' value={bad}/>
            <Statistic text='all' value={total}/>
            <Statistic text='average' value={average()}/>
            <Statistic text='positive' value={positive()}/>
            </tbody>
        </table>
    )
}
const Statistic = ({text, value}) => {
    return (
        <tr>
            <td>{text}</td>
            <td>{value}</td>
        </tr>
    )
}
export default Statistics