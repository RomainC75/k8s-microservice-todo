import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../context/data.context";
import { DataContextInterface } from "../@types/dataContext.type";
import { TodoInterface } from "../@types/todo.type";
import { Button } from "@mui/material";

import "./styles/detailsPanel.css";
import TodoDetails from "./TodoDetails";

const DetailsPanel = () => {
  const {
    selectedListId,
    setSelectedListId,
    todos,
    isLoadingTodos,
    selectedTodoId,
    isDetailsPanelDisplayed
  } = useContext(DataContext) as DataContextInterface;
  const [selectedTodo, setSelectedTodo] = useState<TodoInterface | null>(null);
  const [showUpdate, setShowUpdate] = useState<boolean>(false)

  useEffect(()=>{
    const foundTodo:TodoInterface|undefined = todos.find(todo=>todo._id.toString()===selectedTodoId)
    setSelectedTodo(foundTodo ? foundTodo : null)
  },[selectedTodoId])

  return (
    <section className={`DetailsPanel ${!isDetailsPanelDisplayed ? "hide" : ""}`}>
      <h2>DETAILS</h2>
      { selectedTodo ? <TodoDetails todo={selectedTodo}/> : "no task slected"}
      <Button variant="outlined" size="small" onClick={()=>setShowUpdate(!showUpdate)} color={showUpdate ? "secondary" : "success"}>
          {!showUpdate ? "show Update" : "show infos"}
        </Button>
    </section>
  );
};

export default DetailsPanel;
