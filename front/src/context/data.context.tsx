import { useState, createContext, useEffect, PropsWithChildren, useContext } from "react";
import { AuthContextInterface, UserInterface } from "../@types/authContext.type";
import { NavigateFunction, useNavigate } from "react-router-dom";
import axios from 'axios'
import { DataContextInterface } from "../@types/dataContext.type";
import { AuthContext } from "./auth.context";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

const DataContext = createContext<DataContextInterface | null>(null);

const DataProviderWrapper = (props: PropsWithChildren):JSX.Element => {
    const { authenticateUser, isLoading, isLoggedIn, user } = useContext(
        AuthContext
      ) as AuthContextInterface;
    const [selectedListId, setSelectedListId] = useState<string|null>(null)
    
  
  return (
    <DataContext.Provider value={{ selectedListId, setSelectedListId }}>
      {props.children}
    </DataContext.Provider>
  );
};

export {DataContext, DataProviderWrapper}