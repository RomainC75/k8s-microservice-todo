import React, { useContext, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { AuthContext } from "./context/auth.context";
import { AuthContextInterface } from "./@types/authContext.type";
import ListPanel from "./components/ListPanel";
import TaskPanel from "./components/TaskPanel";
import DetailsPanel from "./components/DetailsPanel";
import NavBar from "./components/NavBar";
import { DataContext } from "./context/data.context";
import { DataContextInterface } from "./@types/dataContext.type";
import DeleteModal from "./components/DeleteModal";

function App() {
  const { authenticateUser, isLoading, isLoggedIn, user } = useContext(
    AuthContext
  ) as AuthContextInterface;
  const { showDeleteModal } = useContext(
    DataContext
  ) as DataContextInterface;

  useEffect(() => {
    console.log(user);
  }, [user]);
  
  return (
    <div className="App">
      {showDeleteModal && <DeleteModal/>}
      <NavBar />
      <div className="content">
        <ListPanel />
        <TaskPanel />
        <DetailsPanel />
      </div>
    </div>
  );
}

export default App;
