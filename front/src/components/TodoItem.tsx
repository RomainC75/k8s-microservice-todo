import React, { useContext } from "react";
import { TodoInterface } from "../@types/todo.type";
import { DataContext } from "../context/data.context";
import { DataContextInterface } from "../@types/dataContext.type";

import "./styles/todoItem.css";
import { extractSimpleDate } from "../utils/common";

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
      <p className="name">{todo.name}</p>
      <p className="date color3">{extractSimpleDate(todo.createdAt)}</p>
    </li>
  );
};

export default TodoItem;
