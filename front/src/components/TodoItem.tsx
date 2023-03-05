import React, { useContext } from "react";
import { TodoInterface } from "../@types/todo.type";
import { DataContext } from "../context/data.context";
import { DataContextInterface } from "../@types/dataContext.type";
import Button from '@mui/material/Button';

import "./styles/todoItem.css";
import { extractSimpleDate } from "../utils/common";
import { putTodo } from "../utils/todos-helper";
import useOutsideClick from "../hooks/useClickOutside";

interface TodoItemInterface {
  todo: TodoInterface;
}

const TodoItem = ({ todo }: TodoItemInterface): JSX.Element => {
  const {
    selectedListId,
    setSelectedListId,
    todos,
    isLoadingTodos,
    selectedTodoId,
    setSelectedTodoId,
    setIsDetailsPanelDisplayed,
    updateTodos
  } = useContext(DataContext) as DataContextInterface;

  const handleToggleIsDone = () =>{
    selectedListId && putTodo(todo._id.toString(),{
      ...todo,
      isDone:!todo.isDone
    }).then(ans=>{
      updateTodos()
    }).catch(err=>{
      console.log('put error : ', err)
    })
  }

  const handleClickOnTodo = () =>{
    setSelectedTodoId(todo._id.toString())
    setIsDetailsPanelDisplayed(true)
  }

  // const handleOutsideClick = (event:React.MouseEvent<HTMLElement, MouseEvent>)=>{ 
  //   event.stopPropagation()
  // }

  const handleOutsideClick = ()=>{
    console.log('outside ! ')
  }

  const ref = useOutsideClick(handleOutsideClick)

  return (
    <li 
      ref={ref}
      className={`TodoItem ${
        selectedTodoId === todo._id.toString() ? "selected" : ""
      }`}
      onClick={() => handleClickOnTodo()}
    >
      <div className="infos">
        <p className="name">{todo.name}</p>
        <p className="date color3">{extractSimpleDate(todo.createdAt)}</p>
      </div>
      <Button variant="outlined" size="small" onClick={handleToggleIsDone} color={todo.isDone ? "secondary" : "success"}>
          {todo.isDone ? "unDone" : "Done"}
        </Button>
    </li>
  );
};

export default TodoItem;
