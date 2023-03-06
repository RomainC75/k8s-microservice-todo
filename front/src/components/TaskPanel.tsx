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
                <ScrollingSection menuName="ADD TODO">
                  <CreateNewTodo />
                </ScrollingSection>
              </div>

              <div className="unDone">
                <ScrollingSection isOpenedByDefault menuName={ `UNDONE (${countTodosRegardingTheState(todos,false)})`}>
                  <TodosList todos={todos.filter((todo) => !todo.isDone)} />
                </ScrollingSection>
              </div>

              <div className="done">
                <ScrollingSection menuName={`DONE (${countTodosRegardingTheState(todos,true)})`}>
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
