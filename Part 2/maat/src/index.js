import React from 'react';
import ReactDOM from 'react-dom';
import countryService from './services/countryService'


class App extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        search: '',
        countries: []
      }
    }
    
    onChange = (event) => {
        this.setState({search: event.target.value})
        countryService.getAll()
            .then(a => this.setState({countries: a.filter(a=>a.name.toLowerCase().includes(this.state.search.toLowerCase()))}))
    }

    render() {
        return(
            <div>
                <form>
                    <div>
                        rajaa näytettäviä: <input value={this.state.search} onChange={this.onChange} />
                    </div>
                </form>

                <CountryList list={this.state.countries} change={(a) => () => () => {
                    this.setState({search: a})
                    countryService.getAll()
                        .then(a => this.setState({countries: a.filter(a=>a.name.toLowerCase().includes(this.state.search.toLowerCase()))}))
                }} />
            </div>
        )
    }
}

const CountryList = (props) => {
    if(props.list.length>10){
        return(
            <div>
                Tarkenna hakuehtoja
            </div>
        )
    }else if(props.list.length===1){
            return(
                <div>
                    <CountryInfo country={props.list[0]} />
                </div>
            )
    }else{
        return(
            <div>
                {props.list.map(a => <Country key={a.cioc} country={a} change={props.change(a.name)} />)}
            </div>
        )
    }
}

const Country = (props) => {
    return(
        <div onClick={props.change()}>
            {props.country.name}
        </div>
    )
}

const CountryInfo = (props) => {
    return(
        <div>
            <h1>{props.country.name}</h1><br />
            Capital: {props.country.capital}<br />
            Population: {props.country.population}<br />
            <img alt="flag" src={props.country.flag} /><br />
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))
