import { useContext, useEffect, useState } from "react";
import { DataContext } from "../context/data.context";
import TodoDetails from "./TodoDetails";
import { Button } from "@mui/material";

import { TodoInterface } from "../@types/todo.type";
import { DataContextInterface } from "../@types/dataContext.type";

import "./styles/detailsPanel.css";

const DetailsPanel = () => {
  const {
    todos,
    selectedTodoId,
    isDetailsPanelDisplayed,
    detailsPanelRef,
    setShowDeleteModal,
    setIsDeleteModalSupposedToDeleteList
  } = useContext(DataContext) as DataContextInterface;
  const [selectedTodo, setSelectedTodo] = useState<TodoInterface | null>(null);

  useEffect(()=>{
    const foundTodo:TodoInterface|undefined = todos.find(todo=>todo._id.toString()===selectedTodoId)
    setSelectedTodo(foundTodo ? foundTodo : null)
  },[selectedTodoId])

  const handleDelete = () =>{
    selectedTodoId && setShowDeleteModal(true)
    setIsDeleteModalSupposedToDeleteList(false)
  }

  return (
    <section ref={detailsPanelRef} className={`DetailsPanel ${!isDetailsPanelDisplayed ? "hide" : ""}`}>
      <h2>DETAILS</h2>
      { selectedTodo ? <TodoDetails todo={selectedTodo}/> : "no task slected"}
      { selectedTodo && <Button variant="outlined" size="small" onClick={()=> handleDelete()} color="error">
          Delete
        </Button>}
    </section>
  );
};

export default DetailsPanel;
