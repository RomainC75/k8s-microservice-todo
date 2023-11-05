import { TodoInterface } from '../@types/todo.type'
import TodoItem from './TodoItem'

import './styles/todosList.css'

interface TodosListInterface {
  todos: TodoInterface[]
}

const TodosList = ({ todos }: TodosListInterface): JSX.Element => {
  return (
    <ul className="TodosList unDone">
      {todos &&
        todos.map(todo => <TodoItem key={todo.id} todo={todo} />)}
    </ul>
  )
}

export default TodosList
