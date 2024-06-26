import { useState } from 'react'
import Header from './components/Header'
import Button from './components/Button'
import Anecdotes from './components/Anecdotes'

const Anecdote = ({anecdote}) => <p>{anecdote}</p>
const Votes = ({votes}) => <p>has {votes} votes</p>
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
            <Anecdote anecdote={Anecdotes[selected]} />
            <Votes votes={votes[selected]} />
            <Button handleClick={VoteForAnecdote} text='Vote'/>
            <Button handleClick={RandomAnecdote} text='Next Anecdote'/>
            <Header text='Anecdote with the most votes'/>
            <Anecdote anecdote={WinningAnecdote}/>
            <Votes votes={highestVote}/>
        </div>
    )
}
export default App
