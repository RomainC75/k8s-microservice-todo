import { TodoInterface } from "./todo.type"

export interface DataContextInterface{
    selectedListId:string|null
    setSelectedListId: (id:string|null)=>void
    todos: TodoInterface[]
    isLoadingTodos: boolean
    isTodosError: boolean
    setSelectedTodoId:(id:string|null)=>void
    selectedTodoId: string|null
}