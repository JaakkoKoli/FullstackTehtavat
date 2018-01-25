import React from 'react';
import ReactDOM from 'react-dom';

const Button = (props) => {
    return (
        <button onClick={props.click}>{props.label}</button>
    )
}

const Statistics = (props) => {
    if((props.good+props.neutral+props.negative)!==0){
        return (
            <div>
                <h1>statistiikka</h1>
                <table>
                    <tbody>
                        <Statistic label="hyvä" counter={props.good} />
                        <Statistic label="neutraali" counter={props.neutral} />
                        <Statistic label="huono" counter={props.negative} />
                        <Statistic label="keskiarvo" counter={(props.negative*(-1)+props.good)/(props.good+props.neutral+props.negative)} />
                        <Statistic label="positiivisia" counter={(100*props.good)/(props.good+props.neutral+props.negative)} />
                    </tbody>
                </table>
            </div>
        )
    }else{
        return (
            <div>
                <h1>statistiikka</h1>
                Ei yhtään palautetta annettu.
            </div>
        )
    }
}

const Statistic = (props) => {
    return (
        <tr><td>{props.label}</td><td>{props.counter}</td></tr>
    )
}

class App extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        good: 0,
        neutral: 0,
        negative: 0
      }
    }

    click = (type) => {
        return () => {
            this.setState({[type]: this.state[type]+1})
        }
    }
  
    render() {
        return (
        <div>
          <div>
            <h1>anna palautetta</h1>
            <Button click={this.click("good")} label="hyvä" />
            <Button click={this.click("neutral")} label="neutraali" />
            <Button click={this.click("negative")} label="huono" />           
            <Statistics good={this.state.good} neutral={this.state.neutral} negative={this.state.negative} />
          </div>
        </div>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
)