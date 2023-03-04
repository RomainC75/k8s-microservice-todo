import React, { useState, useContext } from "react";
import { DataContext } from "../context/data.context";
import { DataContextInterface } from "../@types/dataContext.type";
import { TodoInterface } from "../@types/todo.type";

import './styles/deleteModal.css'

const DeleteModal = () => {
  const { handleDeleteTodo, showDeleteModal } = useContext(
    DataContext
  ) as DataContextInterface;

  return (
    <div className="DeleteModal">
      DeleteModal
    </div>
  );
};

export default DeleteModal;
