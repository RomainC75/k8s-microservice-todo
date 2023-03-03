import React from "react";
import { TodoInterface } from "../@types/todo.type";


import "./styles/todoItem.css";

interface TodoItemInterface {
  todo: TodoInterface;
}

const TodoItem = ({ todo }: TodoItemInterface): JSX.Element => {
  return (
    <li className="TodoItem">
      <div className="name">
        <p>Name: </p>
        <p className="name">{todo.name}</p>
      </div>
      <div className="description">
        <p>Description: </p>
      <p className="description">{todo.description && todo.description  }</p>
      </div>
    </li>
  );
};

export default TodoItem;
