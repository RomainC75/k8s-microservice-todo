import React from 'react'
import { TodoInterface } from '../@types/todo.type'

import './styles/todoDetails.css'

interface TodoDetailsInterface{
  todo:TodoInterface
}

const TodoDetails = ({todo}:TodoDetailsInterface) => {
  return (
    <div className="TodoDetails">
      <p>{todo.name}</p>
      <p>{todo.isDone ? "done " : "undone"}</p>
    </div>
  )
}

export default TodoDetails