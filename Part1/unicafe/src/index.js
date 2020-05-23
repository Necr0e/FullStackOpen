import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Statistic = ({text, value, unit}) => {
    return (
        <tr>
            <td>{text}</td>
        <td> {value} {unit}</td>
        </tr>
    )
}
const Statistics = ({good, neutral, bad}) => {
    const total = good + neutral + bad
    let average = 0
    let positive = 0
    if(total === 0)
    {
        return <p>No feedback given.</p>
    }
    else
    {
        average = (good * 1 + bad * (-1) / total)
        positive = good / total * 100
    }
    return (
            <table>
                <tbody>
                <Statistic text='Good' value={good}/>
                <Statistic text='Neutral' value={neutral}/>
                <Statistic text='Bad' value={bad}/>
                <Statistic text='Total' value={total}/>
                <Statistic text='Average' value={average.toFixed(1)}/>
                <Statistic text='Positive' value={positive.toFixed(1)} unit='%'/>
                </tbody>
            </table>
    )
}

const Button = (props) => {
    return <button onClick={props.onClick}>{props.text}</button>
}
const App = () => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)
    
    return (
        <div>
            <h1>Give Feedback</h1>
            <Button onClick={() => setGood(good + 1)} text='Good'/>
            <Button onClick={() => setNeutral(neutral + 1)} text='Neutral'/>
            <Button onClick={() => setBad(bad + 1)} text='Bad'/>
            <h1>Statistics</h1>
            <Statistics good={good} neutral={neutral} bad={bad}/>
        </div>
    )
}
ReactDOM.render(<App />, document.getElementById('root')
);

