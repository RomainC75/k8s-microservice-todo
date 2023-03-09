import { NewTodoInterface, TodoInterface } from './todo.type'
import { MutableRefObject } from 'react'
import { ListInterface } from './list.type'

export interface DataContextInterface {
  selectedListId: string | null
  setSelectedListId: (id: string | null) => void
  todos: TodoInterface[]
  isLoadingTodos: boolean
  isTodosError: boolean
  setSelectedTodoId: (id: string | null) => void
  selectedTodoId: string | null
  handleGetTodos: () => void
  handleToggleIsDone: (todo: TodoInterface) => void
  isListPanelDisplayed: boolean
  setIsListPanelDisplayed: (shouldDisplayBool: boolean) => void
  isDetailsPanelDisplayed: boolean
  setIsDetailsPanelDisplayed: (shouldDisplayBool: boolean) => void
  showDeleteModal: boolean
  setShowDeleteModal: (val: boolean) => void
  liRefs: MutableRefObject<(HTMLLIElement | null)[]>
  detailsPanelRef: MutableRefObject<HTMLElement | null>
  lists: ListInterface[]
  setLists: (lists: ListInterface[]) => void
  isDeleteModalSupposedToDeleteList: boolean
  setIsDeleteModalSupposedToDeleteList: (val: boolean) => void
  handleGetLists: () => void
  handleDeleteList: () => void
  handleCreateNewList: (name: string) => void
  handleCreateNewTodo: (newTodo: NewTodoInterface) => void
  handleDeleteTodo: () => void
}
