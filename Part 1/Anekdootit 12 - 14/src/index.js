import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: 0,
      mostvotes: 0,
      maxvotes: 0
    }
  }

  next = () => {
    this.setState({
        selected: Math.round(Math.random()*(this.props.anecdotes.length-1))
      })
  }

  vote = () => {
    this.props.votes[this.state.selected]+=1
    this.mostVoted()
  }

  mostVoted = () => {
    if(this.props.votes[this.state.selected]>this.state.maxvotes){
        this.setState({
            mostvotes: this.state.selected,
            maxvotes: this.props.votes[this.state.selected]
        })
    }else{
        this.setState({
            maxvotes: this.props.votes[this.state.mostvotes]
        })
    }
  }

  render() {
    if(this.state.maxvotes===0){
        return (
            <div>
              {this.props.anecdotes[this.state.selected]}<br />
              has {this.props.votes[this.state.selected]} votes<br />
              <button onClick={this.vote}>vote</button><button onClick={this.next}>next anecdote</button><br />
            </div>
          )
    }else{
        return (
            <div>
              {this.props.anecdotes[this.state.selected]}<br />
              has {this.props.votes[this.state.selected]} votes<br />
              <button onClick={this.vote}>vote</button><button onClick={this.next}>next anecdote</button><br />
              <h1>anecdote with most votes</h1>
              {this.props.anecdotes[this.state.mostvotes]}
            </div>
          )
    }
  }
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const votes = [0,0,0,0,0,0]

ReactDOM.render(
  <App anecdotes={anecdotes} votes={votes} />,
  document.getElementById('root')
)