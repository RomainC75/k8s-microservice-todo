import { useContext } from 'react'
import { DataContext } from '../context/data.context'
import Button from '@mui/material/Button'

import { extractSimpleDate } from '../utils/common'

import { TodoInterface } from '../@types/todo.type'
import { DataContextInterface } from '../@types/dataContext.type'

import './styles/todoItem.css'

interface TodoItemInterface {
  todo: TodoInterface
}

const TodoItem = ({ todo }: TodoItemInterface): JSX.Element => {
  const {
    selectedTodoId,
    setSelectedTodoId,
    setIsDetailsPanelDisplayed,
    liRefs,
    handleToggleIsDone,
  } = useContext(DataContext) as DataContextInterface

  const handleClickOnTodo = () => {
    setSelectedTodoId(todo._id.toString())
    setIsDetailsPanelDisplayed(true)
  }

  return (
    <li
      // ref={(li)=>(liRefs.current[todos.findIndex(todoo=>todoo._id===todo._id)]=li)}
      ref={li => liRefs.current.push(li)}
      className={`TodoItem ${
        selectedTodoId === todo._id.toString() ? 'selected' : ''
      }`}
      onClick={() => handleClickOnTodo()}
    >
      <div className="infos">
        <p className="name">{todo.name}</p>
        <p className="date color3">{extractSimpleDate(todo.deadLine)}</p>
      </div>
      <Button
        variant="outlined"
        size="small"
        onClick={() => handleToggleIsDone(todo)}
        color={todo.isDone ? 'secondary' : 'success'}
      >
        {todo.isDone ? 'unDone' : 'Done'}
      </Button>
    </li>
  )
}

export default TodoItem
