import React, { useState, useContext } from "react";
import { DataContext } from "../context/data.context";
import { DataContextInterface } from "../@types/dataContext.type";
import TodoItem from "./TodoItem";

import './styles/taskPanel.css'

const TaskPanel = (): JSX.Element => {
  const { selectedListId, setSelectedListId, todos, isLoadingTodos } =
    useContext(DataContext) as DataContextInterface;

  return (
    <div className="TaskPanel backgroundColor2">
      <h2>Task Panel</h2>
      {isLoadingTodos ? (
        <div className="loading">
          <h3>Loading...</h3>
        </div>
      ) : (
        <>
          <div>
            <h3>add new Todo</h3>
          </div>

          <section className="unDone" >
            <h3>Undone</h3>
            <ul className="unDone">
                {todos && todos.filter(todo=>!todo.isDone).map(todo=><TodoItem todo={todo}/>)}
            </ul>
          </section>
          
          <div className="done">
            <h3>done</h3>
          </div>

        </>
      )}
    </div>
  );
};

export default TaskPanel;
