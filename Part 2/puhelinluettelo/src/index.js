import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'
import personService from './services/personService'
import './index.css'

const Luettelo = ({search, change}) => {
    return (
        <div>
            <h2>Puhelinluettelo</h2>

            <form>
            <div>
                rajaa näytettäviä: <input value={search}
                onChange={change} />
            </div>
            </form>
        </div>
    )
}

const Uusi = ({addName, changeName, changeNum, name, num}) => {
    return (
        <div>
            <h1>Lisää uusi:</h1>
            <form onSubmit={addName}>
              <div>
                nimi: <input value={name}
                onChange={changeName} />
              </div>
              <div>
                numero: <input value={num}
                onChange={changeNum} />
            </div>
              <div>
                <button type="submit" >lisää</button>
              </div>
            </form>
        </div>
    )
}

const Numerot = ({persons, search, deletePerson}) => {
    return (
        <div>
            <h2>Numerot</h2>
            {persons.map((a)=>{
                if(a.name.toLowerCase().includes(search.toLowerCase())){
                    return(
                        <div key={a.name}>{a.name}   {a.num}   <button onClick={deletePerson(a.name)}>poista</button></div>
                    )
                }else{
                    return(null)
                }
            })}
        </div>
    )
}

let msg = null

const setMsg = (m) => {
    msg=m
    ReactDOM.render(
        <App />,
        document.getElementById('root')
    )
}

const reset = () => {
    msg=null
    ReactDOM.render(
        <App />,
        document.getElementById('root')
    )
}

const Notification = ({ message }) => {
    if (message === null) {
      return null
    }
    return (
      <div className="msg">
        {message}
      </div>
    )
  }


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newNum: '',
      search: '',
    }
  }

  componentWillMount() {
    console.log('will mount')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        this.setState({ persons: response.data })
      })
  }

  handleChange = (field) => (event) => {
    console.log(event.target.value)
    this.setState({ [field]: event.target.value })
  }

deletePerson = (name) => () => {
    if(window.confirm("Poistetaanko "+name+"?")){
        personService.del(this.state.persons.find(a => a.name===name).id)
            .then(a => {
                this.setState({
                    persons: this.state.persons.filter(a => a.name !== name)
                })
                setMsg('Henkilö '+name+' poistettu onnistuneesti')
                window.setTimeout(reset,4000)
            })
            .catch(error => {
                setMsg(error)
                window.setTimeout(reset,4000)
                this.setState({persons: this.state.persons.filter(a=>a.name!==name)})
        })
    }
}

 addName = (event) => {
    event.preventDefault()
    if(this.state.persons.reduce((a,b)=>a+(b.name===this.state.newName),0)===0){
        const person = {
            name: this.state.newName,
            num: this.state.newNum
          }
        
        personService.create(person)
        .then(newPerson=> {
            this.setState({
                persons: this.state.persons.concat(newPerson),
                newName: '',
                newNum: ''
            })
            setMsg('Henkilö '+newPerson.name+' lisätty onnistuneesti')
            window.setTimeout(reset,4000)
        }
    ).catch(error=>{
        setMsg(error)
        window.setTimeout(reset,4000)
    })
    }else{
        if(window.confirm('Henkilö ' + this.state.newName + ' on luettelossa, vaihdetaanko tämänhetkinen numero numeroon ' + this.state.newNum + '?')){
            const person = {
                name: this.state.newName,
                num: this.state.newNum,
                id: this.state.persons.find(a => a.name===this.state.newName).id
            }
            personService.update(this.state.persons.find(a => a.name===person.name).id,person)
                .then(res => {
                    this.setState({
                        persons: this.state.persons.filter(a => a.name !== person.name).concat(person)
                    })
                    setMsg('Henkilön '+person.name+' puhelinnumero päivitetty onnistuneesti')
                    window.setTimeout(reset,4000)               
                }).catch(error=>{
                    setMsg(error)
                    window.setTimeout(reset,4000)
                    this.setState({persons: this.state.persons.filter(a=>a.name!==person.name)})
                })
        }
    }
}   

  render() {
    return (
      <div>

        <Notification message={msg} />
        
        <Luettelo search={this.state.search} change={this.handleChange('search')} />

        <Uusi addName={this.addName} changeName={this.handleChange('newName')} changeNum={this.handleChange('newNum')} name={this.state.newName} num={this.state.newNum} />

        <Numerot persons={this.state.persons} search={this.state.search} deletePerson={this.deletePerson} />

      </div>
    )
  }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
  )

export default App