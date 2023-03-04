import React from "react";
import { TodoInterface } from "../@types/todo.type";
import { extractDisplayableDate, extractSimpleDate } from "../utils/common";

import "./styles/todoDetails.css";

interface TodoDetailsInterface {
  todo: TodoInterface;
}

const TodoDetails = ({ todo }: TodoDetailsInterface) => {
  return (
    <div className="TodoDetails">
      <div className="name">
        <p>NAME</p>
        <p>{todo.name}</p>
      </div>
      <div className="description">
        <p>DESCRIPTION</p>
        <p>{todo.description ? todo.description : "no description"}</p>
      </div>
      <div className="isDone">
        <p>STATUS : {todo.isDone ? "✅" : "❌"}</p>
      </div>
      <div className="dueDate">
        <p>DUE DATE</p>
        <p>{extractDisplayableDate(todo.deadLine)}</p>
      </div>
      <div className="creationDate">
        <p>CREATION DATE</p>
        <p>{extractDisplayableDate(todo.createdAt)}</p>
      </div>
    </div>
  );
};

export default TodoDetails;
