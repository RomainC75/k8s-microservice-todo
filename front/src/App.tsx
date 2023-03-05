import { useContext, useEffect } from "react";
import { AuthContext } from "./context/auth.context";
import { DataContext } from "./context/data.context";
import ListPanel from "./components/ListPanel";
import TaskPanel from "./components/TaskPanel";
import DetailsPanel from "./components/DetailsPanel";
import NavBar from "./components/NavBar";
import DeleteModal from "./components/DeleteModal";
import { Toaster } from 'react-hot-toast';


import { DataContextInterface } from "./@types/dataContext.type";
import { AuthContextInterface } from "./@types/authContext.type";

import "./App.css";

function App() {
  const { user } = useContext(
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
      <Toaster />
      {showDeleteModal && <div className="curtain"></div>}
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
