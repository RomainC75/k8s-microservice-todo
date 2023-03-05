import { TodoInterface } from "./todo.type"
import { MutableRefObject } from "react"

export interface DataContextInterface{
    selectedListId:string|null
    setSelectedListId: (id:string|null)=>void
    todos: TodoInterface[]
    isLoadingTodos: boolean
    isTodosError: boolean
    setSelectedTodoId:(id:string|null)=>void
    selectedTodoId: string|null
    updateTodos:()=>void
    isListPanelDisplayed: boolean
    setIsListPanelDisplayed: (shouldDisplayBool:boolean)=>void
    isDetailsPanelDisplayed: boolean
    setIsDetailsPanelDisplayed: (shouldDisplayBool:boolean)=>void
    showDeleteModal:boolean
    setShowDeleteModal: (val:boolean)=>void
    liRefs:MutableRefObject<(HTMLLIElement | null)[]>
    detailsPanelRef: MutableRefObject<HTMLElement | null>
}