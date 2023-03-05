import { useContext } from "react";
import { DataContext } from "../context/data.context";
import TodosList from "./TodosList";
import CreateNewTodo from "./CreateNewTodo";
import ScrollingSection from "./ScrollingSection";
import { countTodosRegardingTheState } from "../utils/todos-helper";

import { DataContextInterface } from "../@types/dataContext.type";

import "./styles/taskPanel.css";

const TaskPanel = (): JSX.Element => {
  const {
    selectedListId,
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
