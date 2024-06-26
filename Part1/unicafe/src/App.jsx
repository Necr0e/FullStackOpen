import { useState } from 'react'
import Header from './components/Header.jsx'
import Button from './components/Button.jsx'
import Statistics from './components/Statistics.jsx'

const App = () => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const handleGoodClick = () => setGood(good + 1)
    const handleNeutralClick = () => setNeutral(neutral + 1)
    const handleBadClick = () => setBad(bad + 1)

    return (
        <div>
            <Header text='Give Feedback'/>
            <Button handleClick={handleGoodClick} text='Good' />
            <Button handleClick={handleNeutralClick} text='Neutral' />
            <Button handleClick={handleBadClick} text='Bad' />
            <Statistics good={good} neutral={neutral} bad={bad}/>
        </div>
    )
}

export default App