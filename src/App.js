import React from "react";
import "./App.css";

import TodosList from './components/TodosList'

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      todos: [],
      valueInput : '',
      tab : 'all'
    }
  }


  componentDidMount() {
    fetch("http://localhost:8080/todos")
    .then((res) => res.json())
    .then((resJson) => this.setState({todos: resJson}))
    .catch((err) => console.log(err))
  }

  requestPostTodo = (data) => {
    fetch("http://localhost:8080/todos", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then((res) => res.json())
    .then((resJson) => this.addTodo(resJson))
    .catch((err) => console.log(err))
  }

  addTodo = (todo) => {
    let newTodos = [...this.state.todos]
    newTodos.push(todo)
    this.setState({
      todos : newTodos,
      valueInput : ''
    })
  }

  onClickButton = (event) => {
    this.requestPostTodo({
      text : this.state.valueInput,
      done : false
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

  getItemsToShow = () => {
    const {tab, todos} = this.state
    if(tab === 'all')
      return todos
    else if(tab === 'todo')
      return todos.filter((todo) => !todo.done)
    else if(tab === 'done')
      return todos.filter((todo) => todo.done)
  }

   render() {
    return (
      <div className="App">
        <h1>{this.props.title}</h1>
        <input value={this.state.valueInput} onChange={this.onChangeInput} placeholder="Add your todo here..." />
        <button onClick={this.onClickButton}>add todo</button>
        <ul style={{listStyleType : 'none'}}>
          <li onClick={(e) => this.setState({tab: 'all'})} className="TabItem">All</li>
          <li onClick={(e) => this.setState({tab: 'todo'})} className="TabItem">To Do</li>
          <li onClick={(e) => this.setState({tab: 'done'})} className="TabItem">Done</li>
        </ul>
        <TodosList toggleDoneTodo={this.toggleDoneTodo} todos={this.getItemsToShow()}/>
      </div>
    );
  }
}

export default App;
