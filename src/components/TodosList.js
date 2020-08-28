import React from "react";

class TodosList extends React.Component {
  render() {
    return (
      <ul>
        {this.props.todos.map((todo) => {
          return (
            <li
              style={{ cursor: "pointer", textDecoration: (todo.done ? 'line-through' : 'none') }}
              onClick={(event) => this.props.toggleDoneTodo(todo.id)}
            >
              {todo.text}
            </li>
          );
        })}
      </ul>
    );
  }
}

export default TodosList;
