import React, { useContext, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { AuthContext } from "./context/auth.context";
import { AuthContextInterface } from "./@types/authContext.type";
import ListPanel from "./components/ListPanel";
import TaskPanel from "./components/TaskPanel";
import DetailsPanel from "./components/DetailsPanel";
import NavBar from "./components/NavBar";

function App() {
  const { authenticateUser, isLoading, isLoggedIn, user } = useContext(
    AuthContext
  ) as AuthContextInterface;
  useEffect(() => {
    console.log(user);
  }, [user]);
  return (
    <div className="App">
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
