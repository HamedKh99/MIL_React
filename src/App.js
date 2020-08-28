import React from "react";
import "./App.css";

import TodosList from './components/TodosList'

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      todos: [],
      valueInput : ''
    }
  }

  onClickButton = (event) => {
    let newTodos = [...this.state.todos]
    newTodos.push({
      text : this.state.valueInput,
      done : false,
      id : this.state.todos.length + 1
    })
    this.setState({
      todos : newTodos,
      valueInput : ''
    })
  }
  
  onChangeInput = (event) => {
    this.setState({
      valueInput : event.target.value
    })
  }

  toggleDoneTodo = (id) => {
    let newTodos = [...this.state.todos]
    newTodos.forEach((todo) => {
      if(todo.id === id)
        todo.done = !todo.done
    })
    this.setState({todos: newTodos})
  }

   render() {
    return (
      <div className="App">
        <h1>{this.props.title}</h1>
        <input value={this.state.valueInput} onChange={this.onChangeInput} placeholder="Add your todo here..." />
        <button onClick={this.onClickButton}>add todo</button>
        <ul style={{listStyleType : 'none'}}>
          <li><a>All</a></li>
          <li><a>To Do</a></li>
          <li><a>Done</a></li>
        </ul>
        <TodosList toggleDoneTodo={this.toggleDoneTodo} todos={this.state.todos}/>
      </div>
    );
  }
}

export default App;
