import { UpdatableTodoDataInterface } from "../@types/todo.type"

// the user is not supposed to modify theses 4 keys ONLY
export const listUpdateFilter = (rawUpdateData:Object):UpdatableTodoDataInterface => {

  const updatedTodo = {}
  const keys:string[] = ['name', 'isDone', 'description', 'deadLine']
  const filteredTodoKeys:string[] = keys.filter((key) => rawUpdateData[key])
  filteredTodoKeys.forEach((key) => (updatedTodo[key] = rawUpdateData[key]))

  console.log('==>', updatedTodo)
    return  updatedTodo
}
