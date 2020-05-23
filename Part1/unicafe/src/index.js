import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import './index.css';

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
        <div>
            <h1>Statistics</h1>
            <p>Good: {good}<br />
            neutral: {neutral}<br />
            bad: {bad}<br/>
            total: {total}<br/>
            average: {average}<br/>
            positive(%):  {positive} %<br/></p>
        </div>
    )
}

const App = () => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)
    
    return (
        <div>
            <h1>Give Feedback</h1>
            <button onClick={() => setGood(good +1)}>Good</button>
            <button onClick={() => setNeutral(neutral +1)}>Neutral</button>
            <button onClick={() => setBad(bad +1)}>Bad</button>
        <Statistics good={good} neutral={neutral} bad={bad}/>
        </div>
    )
}
ReactDOM.render(<App />, document.getElementById('root')
);

