import React, { useState, useContext } from "react";
import { DataContext } from "../context/data.context";
import { DataContextInterface } from "../@types/dataContext.type";
import TodoItem from "./TodoItem";

import "./styles/taskPanel.css";
import TodosList from "./TodosList";
import CreateNewTodo from "./CreateNewTodo";
import { TodoInterface } from "../@types/todo.type";

const TaskPanel = (): JSX.Element => {
  const { selectedListId, setSelectedListId, todos, isLoadingTodos, isListPanelDisplayed, isDetailsPanelDisplayed } =
    useContext(DataContext) as DataContextInterface;
  


  return (
    <div className={`TaskPanel ${isListPanelDisplayed ? "showListPanel" :" "} ${isDetailsPanelDisplayed ? "showDetailsPanel" : ""}`}>
      <div className="title">
        <h2>Task Panel</h2>
      </div>
      {isLoadingTodos ? (
        <div className="loading">
          <h3>Loading...</h3>
        </div>
      ) : (
        <>
          {selectedListId ? (
            <>
              <div>
                <h3>Add Todo</h3>
                <CreateNewTodo/>
              </div>

              <section className="unDone">
                <h3>Undone</h3>
                  <TodosList todos={todos.filter(todo=>!todo.isDone)}/>
              </section>

              <div className="done">
                <h3>done</h3>
                <TodosList todos={todos.filter(todo=>todo.isDone)}/>
              </div>
            </>
          ) : (
            <p>Please choose a list</p>
          )}
        </>
      )}
    </div>
  );
};

export default TaskPanel;
