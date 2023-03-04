import React, { useState, useContext } from "react";
import { DataContext } from "../context/data.context";
import { DataContextInterface } from "../@types/dataContext.type";
import { TodoInterface } from "../@types/todo.type";

import './styles/deleteModal.css'
import { Button } from "@mui/material";

const DeleteModal = () => {
  const { handleDeleteTodo, showDeleteModal, setShowDeleteModal } = useContext(
    DataContext
  ) as DataContextInterface;

  return (
    <div className="DeleteModal">
      DeleteModal
      <Button onClick={()=>setShowDeleteModal(false)}>Cancel</Button>
    </div>
  );
};

export default DeleteModal;
