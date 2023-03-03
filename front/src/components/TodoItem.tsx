import React, { useContext } from "react";
import { TodoInterface } from "../@types/todo.type";
import { DataContext } from "../context/data.context";
import { DataContextInterface } from "../@types/dataContext.type";

import "./styles/todoItem.css";

interface TodoItemInterface {
  todo: TodoInterface;
}

const TodoItem = ({ todo }: TodoItemInterface): JSX.Element => {
  const {
    selectedListId,
    setSelectedListId,
    todos,
    isLoadingTodos,
    selectedTodoId,
    setSelectedTodoId,
  } = useContext(DataContext) as DataContextInterface;

  return (
    <li
      className={`TodoItem ${
        selectedTodoId === todo._id.toString() ? "selected" : ""
      }`}
      onClick={() => setSelectedTodoId(todo._id.toString())}
    >
      <div className="name">
        <p>Name: </p>
        <p className="name">{todo.name}</p>
      </div>
      <div className="description">
        <p>Description: </p>
        <p className="description">{todo.description && todo.description}</p>
      </div>
    </li>
  );
};

export default TodoItem;
