import React, { useState, useContext } from "react";
import { DataContext } from "../context/data.context";
import { DataContextInterface } from "../@types/dataContext.type";
import { TodoInterface } from "../@types/todo.type";
import toast from 'react-hot-toast';

import "./styles/deleteModal.css";
import { Button } from "@mui/material";
import { deleteTodo } from "../utils/todos-helper";

const DeleteModal = () => {
  const {
    setShowDeleteModal,
    todos,
    selectedTodoId,
    setSelectedTodoId,
    updateTodos,
  } = useContext(DataContext) as DataContextInterface;

  const handleDelete = () => {
    selectedTodoId &&
      deleteTodo(selectedTodoId).then((ans) => {
        setShowDeleteModal(false);
        updateTodos();
        setSelectedTodoId(null)
        toast.success('todo deleted')
      }).catch(err=>{
        toast.error('todo not deleted')
      })
  }

  return (
    <div className="DeleteModal">
      <div className="title">
        <p>DELETE THIS TODO ?</p>
      </div>

      <div className="name">
      {selectedTodoId &&
        todos.find((todo) => todo._id.toString() === selectedTodoId)?.name}
      </div>
      <div className="selection">
        <Button
          onClick={() => handleDelete()}
          variant="contained"
          color="error"
        >
          Delete
        </Button>
        <Button onClick={() => setShowDeleteModal(false)} variant="contained">
          Cancel
        </Button>
      </div>
    </div>
  );
}

export default DeleteModal
