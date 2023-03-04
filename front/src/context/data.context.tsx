import {
  useState,
  createContext,
  useEffect,
  PropsWithChildren,
  useContext,
} from "react";
import {
  AuthContextInterface,
  UserInterface,
} from "../@types/authContext.type";
import { NavigateFunction, useNavigate } from "react-router-dom";
import axios from "axios";
import { DataContextInterface } from "../@types/dataContext.type";
import { AuthContext } from "./auth.context";
import { TodoInterface } from "../@types/todo.type";
import { getTodosFromList } from "../utils/todos-helper";

const DataContext = createContext<DataContextInterface | null>(null);

const DataProviderWrapper = (props: PropsWithChildren): JSX.Element => {
  const { authenticateUser, isLoading, isLoggedIn, user } = useContext(
    AuthContext
  ) as AuthContextInterface;
  const [selectedListId, setSelectedListId] = useState<string | null>(null);
  const [selectedTodoId, setSelectedTodoId] = useState<string | null>(null);
  const [isLoadingTodos, setIsLoadingTodos] = useState<boolean>(false);
  const [isTodosError, setIsTodosError] = useState<boolean>(false);
  const [todos, setTodos] = useState<TodoInterface[]>([]);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false)
  const [todoToDeleteId, setTodoToDeleteId] = useState<string|null>(null)

  // states for display arrangement
  const [isListPanelDisplayed, setIsListPanelDisplayed] =
    useState<boolean>(false);
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

  const handleDeleteTodo = (id:string) =>{
    setShowDeleteModal(true)
    setTodoToDeleteId(id)
  }
  const handleDeleteConfirmation = () =>{
    
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
        updateTodos,
        isListPanelDisplayed,
        setIsListPanelDisplayed,
        isDetailsPanelDisplayed,
        setIsDetailsPanelDisplayed,
        handleDeleteTodo,
        handleDeleteConfirmation,
        showDeleteModal,
        setShowDeleteModal
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
};

export { DataContext, DataProviderWrapper };
