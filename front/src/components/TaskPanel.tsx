import React, { useState, useContext } from "react";
import { DataContext } from "../context/data.context";
import { DataContextInterface } from "../@types/dataContext.type";

const TaskPanel = (): JSX.Element => {
  const { selectedListId, setSelectedListId, todos, isLoadingTodos } =
    useContext(DataContext) as DataContextInterface;

  return (
    <div className="TaskPanel">
      <h2>Task Panel</h2>
      {isLoadingTodos ? (
        <div className="loading">
          <h3>Loading...</h3>
        </div>
      ) : (
        JSON.stringify(todos)
      )}
    </div>
  );
};

export default TaskPanel;
