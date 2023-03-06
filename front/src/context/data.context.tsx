import {
  useState,
  createContext,
  useEffect,
  PropsWithChildren,
  useContext,
  useRef,
} from "react";
import {
  AuthContextInterface,
} from "../@types/authContext.type";
import { DataContextInterface } from "../@types/dataContext.type";
import { AuthContext } from "./auth.context";
import { TodoInterface } from "../@types/todo.type";
import { ListInterface } from "../@types/list.type";
import { getTodosFromList } from "../utils/todos-helper";
import { createList, deleteList, getLists } from "../utils/lists-helper";

const DataContext = createContext<DataContextInterface | null>(null);

const DataProviderWrapper = (props: PropsWithChildren): JSX.Element => {
  const { isLoggedIn } = useContext(
    AuthContext
  ) as AuthContextInterface;
  const [selectedListId, setSelectedListId] = useState<string | null>(null);
  const [selectedTodoId, setSelectedTodoId] = useState<string | null>(null);
  const [isLoadingTodos, setIsLoadingTodos] = useState<boolean>(false);
  const [isTodosError, setIsTodosError] = useState<boolean>(false);
  const [todos, setTodos] = useState<TodoInterface[]>([]);
  const [lists, setLists] = useState<ListInterface[]>([]);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
    const [isDeleteModalSupposedToDeleteList, setIsDeleteModalSupposedToDeleteList] = useState<boolean>(false)

  const liRefs = useRef<Array<HTMLLIElement | null>>([]);
  const detailsPanelRef = useRef<HTMLElement | null>(null);

  // states for display arrangement
  const [isListPanelDisplayed, setIsListPanelDisplayed] =
    useState<boolean>(true);
  const [isDetailsPanelDisplayed, setIsDetailsPanelDisplayed] =
    useState<boolean>(false);

  useEffect(() => {
    updateTodos();
    setSelectedTodoId(null);
  }, [selectedListId]);

  const updateTodos = () => {
    console.log("selected List id : ", selectedListId);
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
        });
    }
  };

  const handleGetLists = () => {
    getLists().then((ans) => {
      if (ans.status === 200) {
        setLists(ans.data);
      }
    });
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const detailsPanelEl = document.querySelector('.DetailsPanel')
      const element = event.target as HTMLElement
      if(detailsPanelEl && detailsPanelEl.contains(element)){
        return 
      }
      if (
        !liRefs.current.some((li) => {
          return li && li.contains(event.target as Node);
        })
      ) {
        !showDeleteModal && setSelectedTodoId(null);
        setIsDetailsPanelDisplayed(false)
        console.log("click OutSide !");
      }
    }
    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [liRefs])

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
        updateTodos,
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
        handleGetLists
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
};

export { DataContext, DataProviderWrapper };
