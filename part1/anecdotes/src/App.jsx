import { useState } from 'react'
import Anecdotes from './components/Anecdotes'
const App = () => {
    const [selected, setSelected] = useState(0)
    const [votes, setVotes] = useState(new Array(Anecdotes.length).fill(0))
    const RandomAnecdote = () => {
        let randomNumber = Math.floor(Math.random() * Math.floor(Anecdotes.length))
        setSelected(randomNumber)
    }
    const VoteForAnecdote = () => {
        const copy = [...votes]
        copy[selected] += 1
        setVotes(copy)
    }
    
    const highestVote = Math.max(...votes)
    const WinningAnecdote = Anecdotes[votes.indexOf(highestVote)]
    return (
        <div>
            <Header text='Anecdote of the day'/>
            <Anecdote anecdote={Anecdotes[selected]}/>
            <Votes votes={votes[selected]}/>
            <Button handleClick={VoteForAnecdote} text='Vote'/>
            <Button handleClick={RandomAnecdote} text='Next Anecdote'/>
            <Header text='Anecdote with the most votes'/>
            <Anecdote anecdote={WinningAnecdote}/>
            <Votes votes={highestVote}/>
        </div>
    )
}
const Header = ({text}) => <h1>{text}</h1>
const Anecdote = ({anecdote}) => <p>{anecdote}</p>
const Votes = ({votes}) =>  <p>has {votes} votes</p>
const Button = ({handleClick, text}) => <button onClick={handleClick}>{text}</button>

export default App
