import React, {useState} from 'react';
import ReactDOM from 'react-dom';

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'the first 90 percent of the code accounts for the first 90 percent of the code accounts for the other 90 percent of the development time',
    'Any fool can write code that a computer can understand.  Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil',
    'Debugging is twice as hard as writing the code in the first place.  Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const App = (props) => {
    const [selected, setSelected] = useState(0)
    const [votes, setVotes] = useState(Array.apply(null, new Array(anecdotes.length)).map(Number.prototype.valueOf, 0))
    const maxVotes = Math.max(...votes)
    const totalVotes = votes.indexOf(maxVotes)
    const handleClick = () => {
        let newValue = null
        do {
            newValue = Math.floor(Math.random() * anecdotes.length)
        }
        while (newValue === selected)
        setSelected(newValue)
    }
    const handleVote = () =>
    {
        const copyVotes = [...votes]
        copyVotes[selected] += 1
        setVotes(copyVotes)
    }
  return (
      <div>
        {props.anecdotes[selected]} <br/>
        <p>Has {votes[selected]} votes</p>
          <button onClick={handleVote}>Vote</button>
          <button onClick={handleClick}>Next anecdote</button>
          <h2>Anecdote with the most votes</h2>
          <p>{props.anecdotes[totalVotes]}</p>
      </div>
  )
}
ReactDOM.render(<App anecdotes={anecdotes}/>, document.getElementById('root')
);

