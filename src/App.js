import React from 'react';
import logo from './logo.svg';
import './App.css';
import { render } from '@testing-library/react';

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      things : [{
        id: 1,
        name : 'grenade',
        type: 'weapon',
      },
      {
        id: 2,
        name: 'pear',
        type: 'fruit',
      },
      {
        id: 3,
        name: 'football',
        type: 'equipment',
      }
    ],
      firstThing : 'Grenade',
    }
    this.thingCreatedHandler = this.thingCreatedHandler.bind(this);
  }
  thingCreatedHandler(thing){
    const updatedThings = this.state.things;
    updatedThings.push({name: thing.name, type: '???', id: Math.floor(Math.random() * 10000)})

    this.setState({
      things: updatedThings,
      lastestThing: thing
    });
  }

  render(){
    return(
      <div className='App'>
        <Header things={this.state.things} />
        <main>
          {/* <ThingList things={this.state.things} onThingsCreate={() => alert('hi')}/> */}
          <ThingList things={this.state.things} />
          <ThingsForm onThingsCreateItems={this.thingCreatedHandler} otherstuff="whatever" />
        </main>
        <Footer text="text"/>
      </div>
    )
  }
}

function Header(props){
  return(
    <h2>Item List Count: {props.things.length}</h2>
  )
}

function ThingList(props){
  return (
    <>
    <ul>
      {props.things.map(things => <Thing item={things} key={things.id}/>)}
    </ul>
    </>
  )
}

class ThingsForm extends React.Component{
  constructor(props){
    super(props)
      this.state = {
        name : '???',
        category : '???',
      }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleChange(event){
    // const newName = event.target.value;
    // this.setState = ({
    //   name : newName,
    // })
    if(event.target.name === 'thing-name'){
      const newThing = event.target.value;
      this.setState({
        name: newThing
      })
    }else{
      const newCategory = event.target.value;
      this.setState({
        category: newCategory
      })
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onThingsCreateItems(this.state);
  }

  render(){
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
            Name:
            <input
            name="thing-name" type="text" value={this.state.name} onChange={this.handleChange}>
            </input>
        </label>
        <label>
            Category:
            <input
            name="thing-category" type="text" value={this.state.category} onChange={this.handleChange}>
            </input>
        </label>
        <button>ok</button>
      </form>
    )
  }
}

function Thing(props){
  return (
    <li>{props.item.name} {props.item.category}</li>
  )
}


function Footer(props){
  return(
    <footer><small>{props.text}</small></footer>
  )
}

export default App;
