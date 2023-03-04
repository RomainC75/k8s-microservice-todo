import React, { useState, useContext } from "react";
import TodoItem from "./TodoItem";
import TodosList from "./TodosList";
import CreateNewTodo from "./CreateNewTodo";
import ScrollingSection from "./ScrollingSection";

import { DataContext } from "../context/data.context";
import { DataContextInterface } from "../@types/dataContext.type";
import { TodoInterface } from "../@types/todo.type";

import "./styles/taskPanel.css";

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
    <div
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

              <section className="unDone">
                <h3>UNDONE</h3>
                <ScrollingSection isOpenedByDefault>
                  <TodosList todos={todos.filter((todo) => !todo.isDone)} />
                </ScrollingSection>
              </section>

              <div className="done">
                <h3>DONE</h3>
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
    </div>
  );
};

export default TaskPanel;
