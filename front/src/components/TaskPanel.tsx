import React, { useState, useContext } from "react";
import TodoItem from "./TodoItem";
import TodosList from "./TodosList";
import CreateNewTodo from "./CreateNewTodo";
import ScrollingSection from "./ScrollingSection";

import { DataContext } from "../context/data.context";
import { DataContextInterface } from "../@types/dataContext.type";
import { TodoInterface } from "../@types/todo.type";

import "./styles/taskPanel.css";
import { countTodosRegardingTheState } from "../utils/todos-helper";

const TaskPanel = (): JSX.Element => {
  const {
    selectedListId,
    setSelectedListId,
    todos,
    isLoadingTodos,
    isListPanelDisplayed,
    isDetailsPanelDisplayed,
  } = useContext(DataContext) as DataContextInterface;



  return (
    <section
      className={`TaskPanel ${isListPanelDisplayed ? "showListPanel" : " "} ${
        isDetailsPanelDisplayed ? "showDetailsPanel" : ""
      }`}
    >
      <div className="title">
        <h2>TASK PANEL</h2>
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
                <h3>ADD TODO</h3>
                <ScrollingSection isOpenedByDefault>
                  <CreateNewTodo />
                </ScrollingSection>
              </div>

              <div className="unDone">
                <h3>UNDONE ({countTodosRegardingTheState(todos,false)})</h3>
                <ScrollingSection isOpenedByDefault>
                  <TodosList todos={todos.filter((todo) => !todo.isDone)} />
                </ScrollingSection>
              </div>

              <div className="done">
                <h3>DONE ({countTodosRegardingTheState(todos,true)})</h3>
                <ScrollingSection>
                  <TodosList todos={todos.filter((todo) => todo.isDone)} />
                </ScrollingSection>
              </div>
            </>
          ) : (
            <p>Please choose a list</p>
          )}
        </>
      )}
    </section>
  );
};

export default TaskPanel;
