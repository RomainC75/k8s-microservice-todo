import {
  useState,
  createContext,
  useEffect,
  PropsWithChildren,
  useContext,
  useRef,
} from 'react'
import { AuthContextInterface } from '../@types/authContext.type'
import { DataContextInterface } from '../@types/dataContext.type'
import { AuthContext } from './auth.context'
import { NewTodoInterface, TodoInterface } from '../@types/todo.type'
import { ListInterface } from '../@types/list.type'
import {
  createTodo,
  getTodosFromList,
  deleteTodo,
  putTodo,
} from '../utils/todos-helper'
import { createList, deleteList, getLists } from '../utils/lists-helper'

import toast from 'react-hot-toast'

const DataContext = createContext<DataContextInterface | null>(null)

const DataProviderWrapper = (props: PropsWithChildren): JSX.Element => {
  const { isLoggedIn, authenticateUser } = useContext(
    AuthContext
  ) as AuthContextInterface
  const [selectedListId, setSelectedListId] = useState<string | null>(null)
  const [selectedTodoId, setSelectedTodoId] = useState<string | null>(null)
  const [isLoadingTodos, setIsLoadingTodos] = useState<boolean>(false)
  const [isTodosError, setIsTodosError] = useState<boolean>(false)
  const [todos, setTodos] = useState<TodoInterface[]>([])
  const [lists, setLists] = useState<ListInterface[]>([])
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false)
  const [
    isDeleteModalSupposedToDeleteList,
    setIsDeleteModalSupposedToDeleteList,
  ] = useState<boolean>(false)

  const liRefs = useRef<Array<HTMLLIElement | null>>([])
  const detailsPanelRef = useRef<HTMLElement | null>(null)

  // states for display arrangement
  const [isListPanelDisplayed, setIsListPanelDisplayed] =
    useState<boolean>(true)
  const [isDetailsPanelDisplayed, setIsDetailsPanelDisplayed] =
    useState<boolean>(false)

  useEffect(() => {
    handleGetTodos()
    setSelectedTodoId(null)
  }, [selectedListId])

  useEffect(() => {
    console.log('showDeleteModal : ', showDeleteModal)
  }, [showDeleteModal])

  useEffect(() => {
    window.addEventListener('click', handleClickOutside)
    return () => {
      window.removeEventListener('click', handleClickOutside)
    }
  }, [liRefs])

  function handleClickOutside(event: MouseEvent) {
    const element = event.target as HTMLElement
    const detailsPanelEl = document.querySelector('.DetailsPanel')
    const detailsChevronEl = document.getElementById('detailsChevron')
    if (detailsChevronEl && detailsChevronEl?.contains(element)) {
      return
    }
    if (detailsPanelEl && detailsPanelEl.contains(element)) {
      return
    }
    const clickedElementIsAChildOfATodoItem: boolean = liRefs.current.some(
      li => {
        return li && li.contains(event.target as Node)
      }
    )
    if (!clickedElementIsAChildOfATodoItem && !showDeleteModal) {
      setSelectedTodoId(null)
      setIsDetailsPanelDisplayed(false)
    }
  }

  // handle Lists ==================

  const handleGetLists = () => {
    getLists()
      .then(ans => {
        if (ans.status === 200) {
          setLists(ans.data)
        }
      })
      .catch(() => {
        toast.error('error getting lists')
        authenticateUser()
      })
  }

  const handleDeleteList = () => {
    selectedListId &&
      deleteList(selectedListId)
        .then(() => {
          setShowDeleteModal(false)
          handleGetLists()
          setSelectedListId(null)
          toast.success('List deleted')
        })
        .catch(() => {
          toast.error('list not deleted')
          authenticateUser()
        })
  }

  const handleCreateNewList = (name: string) => {
    createList(name)
      .then(ans => {
        // select the new created list. No async problem ???
        setSelectedListId(ans.data.list._id)
        handleGetLists()
        toast.success('list created !')
      })
      .catch(() => {
        toast.error('error : cannot create a new list')
        authenticateUser()
      })
  }

  // handle todos ==================
  const handleGetTodos = () => {
    if (isLoggedIn && selectedListId) {
      setIsLoadingTodos(true)
      setIsTodosError(false)
      getTodosFromList(selectedListId)
        .then(ans => {
          if (ans.status === 200) {
            setTodos(ans.data)
          }
          setIsLoadingTodos(false)
        })
        .catch(() => {
          setIsLoadingTodos(false)
          setIsTodosError(true)
          toast.error('error : cannot get the task')
          authenticateUser()
        })
    }
  }

  const handleDeleteTodo = () => {
    selectedTodoId &&
      deleteTodo(selectedTodoId)
        .then(() => {
          setShowDeleteModal(false)
          handleGetTodos()
          setSelectedTodoId(null)
          toast.success('Task deleted')
          handleGetLists()
        })
        .catch(() => {
          toast.error('Error : could not delete the task !')
          console.log('mlksjdmlksjdf')
          authenticateUser()
        })
  }

  const handleCreateNewTodo = (newTodo: NewTodoInterface): void => {
    newTodo.deadLine = newTodo.deadLine+"T00:00:00Z"
    selectedListId &&
      createTodo(selectedListId, newTodo)
        .then(() => {
          handleGetTodos()
          toast.success('Task created')
          handleGetLists()
        })
        .catch(() => {
          console.log('===> erre !!')
          authenticateUser()
          toast.error('error : could not create the new task !')
        })
  }

  const handleToggleIsDone = (todo: TodoInterface) => {
    selectedListId &&
      putTodo(todo.id, {
        ...todo,
        isDone: !todo.isDone,
      })
        .then(() => {
          handleGetTodos()
          toast.success('todo updated')
        })
        .catch(() => {
          toast.error('error : could not update the todo')
          authenticateUser()
        })
  }

  return (
    <DataContext.Provider
      value={{
        selectedListId,
        setSelectedListId,
        todos,
        isLoadingTodos,
        isTodosError,
        selectedTodoId,
        setSelectedTodoId,
        handleGetTodos,
        isListPanelDisplayed,
        setIsListPanelDisplayed,
        isDetailsPanelDisplayed,
        setIsDetailsPanelDisplayed,
        showDeleteModal,
        setShowDeleteModal,
        liRefs,
        detailsPanelRef,
        lists,
        setLists,
        isDeleteModalSupposedToDeleteList,
        setIsDeleteModalSupposedToDeleteList,
        handleGetLists,
        handleDeleteList,
        handleCreateNewList,
        handleCreateNewTodo,
        handleDeleteTodo,
        handleToggleIsDone,
      }}
    >
      {props.children}
    </DataContext.Provider>
  )
}

export { DataContext, DataProviderWrapper }
