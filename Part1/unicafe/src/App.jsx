import { useState } from 'react'

const App = () => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const total = good + neutral + bad

    return (
        <div>
            <h1>Give Feedback</h1>
            <button onClick={() => setGood(good + 1)}>good</button>
            <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
            <button onClick={() => setBad(bad + 1)}>bad</button>
            <h1>Statistics</h1>
            <p>
                good: {good} < br/>
                neutral: {neutral} < br/>
                bad: {bad} < br/>
                all: {total} < br/>
                average: {(good - bad) / total} < br/>
                positive: {good / total * 100} % < br/>
            </p>
        </div>
    )
}

export default App