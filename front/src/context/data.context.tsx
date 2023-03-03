import { useState, createContext, useEffect, PropsWithChildren, useContext } from "react";
import { AuthContextInterface, UserInterface } from "../@types/authContext.type";
import { NavigateFunction, useNavigate } from "react-router-dom";
import axios from 'axios'
import { DataContextInterface } from "../@types/dataContext.type";
import { AuthContext } from "./auth.context";
import { TodoInterface } from "../@types/todo.type";
import { getTodosFromList } from "../utils/todos-helper";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

const DataContext = createContext<DataContextInterface | null>(null);

const DataProviderWrapper = (props: PropsWithChildren):JSX.Element => {
    const { authenticateUser, isLoading, isLoggedIn, user } = useContext(
        AuthContext
      ) as AuthContextInterface;
    const [selectedListId, setSelectedListId] = useState<string|null>(null)
    const [isLoadingTodos, setIsLoadingTodos] = useState<boolean>(false)
    const [isTodosError, setIsTodosError] = useState<boolean>(false)
    const [todos, setTodos] = useState<TodoInterface[]>([])
  
    useEffect(()=>{
        console.log('selected List id : ', selectedListId)
        if(isLoggedIn && selectedListId ){
            setIsLoadingTodos(true)
            setIsTodosError(false)
            getTodosFromList(selectedListId).then(ans=>{
               if(ans.status===200){
                   setTodos(ans.data)
                }
                setIsLoadingTodos(false)
           }).catch(err=>{
            setIsLoadingTodos(false)
            setIsTodosError(true)
           })
        }
  },[selectedListId])

  return (
    <DataContext.Provider value={{ selectedListId, setSelectedListId, todos, isLoadingTodos, isTodosError }}>
      {props.children}
    </DataContext.Provider>
  );
};

export {DataContext, DataProviderWrapper}