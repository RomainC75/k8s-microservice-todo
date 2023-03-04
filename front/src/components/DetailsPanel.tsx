import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../context/data.context";
import { DataContextInterface } from "../@types/dataContext.type";
import { TodoInterface } from "../@types/todo.type";

import "./styles/detailsPanel.css";
import TodoDetails from "./TodoDetails";

const DetailsPanel = () => {
  const {
    selectedListId,
    setSelectedListId,
    todos,
    isLoadingTodos,
    selectedTodoId,
  } = useContext(DataContext) as DataContextInterface;
  const [selectedTodo, setSelectedTodo] = useState<TodoInterface | null>(null);

  useEffect(()=>{
    const foundTodo:TodoInterface|undefined = todos.find(todo=>todo._id.toString()===selectedTodoId)
    setSelectedTodo(foundTodo ? foundTodo : null)
  },[selectedTodoId])

  return (
    <section className="DetailsPanel">
      <h3>Details Panel</h3>
      { selectedTodo && <TodoDetails todo={selectedTodo}/> }
    </section>
  );
};

export default DetailsPanel;
