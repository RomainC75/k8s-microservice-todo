import {
  useState,
  createContext,
  useEffect,
  PropsWithChildren,
  useContext,
  useRef,
} from "react";
import { AuthContextInterface } from "../@types/authContext.type";
import { DataContextInterface } from "../@types/dataContext.type";
import { AuthContext } from "./auth.context";
import { NewTodoInterface, TodoInterface } from "../@types/todo.type";
import { ListInterface } from "../@types/list.type";
import { createTodo, getTodosFromList, deleteTodo } from "../utils/todos-helper";
import { createList, deleteList, getLists } from "../utils/lists-helper";

import toast from "react-hot-toast";

const DataContext = createContext<DataContextInterface | null>(null);

const DataProviderWrapper = (props: PropsWithChildren): JSX.Element => {
  const { isLoggedIn } = useContext(AuthContext) as AuthContextInterface;
  const [selectedListId, setSelectedListId] = useState<string | null>(null);
  const [selectedTodoId, setSelectedTodoId] = useState<string | null>(null);
  const [isLoadingTodos, setIsLoadingTodos] = useState<boolean>(false);
  const [isTodosError, setIsTodosError] = useState<boolean>(false);
  const [todos, setTodos] = useState<TodoInterface[]>([]);
  const [lists, setLists] = useState<ListInterface[]>([]);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [
    isDeleteModalSupposedToDeleteList,
    setIsDeleteModalSupposedToDeleteList,
  ] = useState<boolean>(false);

  const liRefs = useRef<Array<HTMLLIElement | null>>([]);
  const detailsPanelRef = useRef<HTMLElement | null>(null);

  // states for display arrangement
  const [isListPanelDisplayed, setIsListPanelDisplayed] =
    useState<boolean>(true);
  const [isDetailsPanelDisplayed, setIsDetailsPanelDisplayed] =
    useState<boolean>(false);

  useEffect(() => {
    handleGetTodos();
    setSelectedTodoId(null);
  }, [selectedListId]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const detailsPanelEl = document.querySelector(".DetailsPanel");
      const element = event.target as HTMLElement;
      if (detailsPanelEl && detailsPanelEl.contains(element)) {
        return;
      }
      if (
        !liRefs.current.some((li) => {
          return li && li.contains(event.target as Node);
        })
      ) {
        !showDeleteModal && setSelectedTodoId(null);
        setIsDetailsPanelDisplayed(false);
        console.log("click OutSide !");
      }
    }
    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [liRefs]);

  // handle Lists ==================

  const handleGetLists = () => {
    getLists()
      .then((ans) => {
        if (ans.status === 200) {
          setLists(ans.data);
        }
      })
      .catch((err) => {
        toast.error("error getting lists");
      });
  };

  const handleDeleteList = () => {
    selectedListId && deleteList(selectedListId).then(ans=>{
      setShowDeleteModal(false)
      handleGetLists()
      setSelectedListId(null)
      toast.success("List deleted")
    }).catch(err=>{
      toast.error('list not deleted')
    })
  };

  const handleCreateNewList = (name: string) => {
    createList(name)
      .then((ans) => {
        // select the new created list. No async problem ???
        setSelectedListId(ans.data.list._id);
        handleGetLists();
        toast.success("list created !");
      })
      .catch((err) => {
        toast.error("error : cannot create a new list");
      });
  };

  // handle todos ==================
  const handleGetTodos = () => {
    if (isLoggedIn && selectedListId) {
      setIsLoadingTodos(true);
      setIsTodosError(false);
      getTodosFromList(selectedListId)
        .then((ans) => {
          if (ans.status === 200) {
            setTodos(ans.data);
          }
          setIsLoadingTodos(false);
        })
        .catch((err) => {
          setIsLoadingTodos(false);
          setIsTodosError(true);
          toast.error('error : cannot get the task')
        });
    }
  };

  const handleDeleteTodo = ()=>{
    selectedTodoId &&
        deleteTodo(selectedTodoId).then((ans) => {
          setShowDeleteModal(false)
          handleGetTodos();
          setSelectedTodoId(null)
          toast.success("Task deleted")
        }).catch(err=>{
          toast.error('Error : could not delete the task !')
        })
  }

  const handleCreateNewTodo = (newTodo: NewTodoInterface): void => {
    selectedListId &&
      createTodo(selectedListId, newTodo).then((ans) => {
        handleGetTodos();
        toast.success('Task created')
      }).catch(err=>{
        toast.error('error : could not create the new task !')
      })
  };

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
        handleDeleteTodo
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
};

export { DataContext, DataProviderWrapper };
