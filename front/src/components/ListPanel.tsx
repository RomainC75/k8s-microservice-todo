import React, { useEffect } from "react";
import { useState, useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { AuthContextInterface } from "../@types/authContext.type";
import { Navigate } from "react-router-dom";
import { ListInterface } from "../@types/list.type";
import { createList, deleteList, getLists } from "../utils/axios-helper";
import ListItem from "./ListItem";
import CreateNewList from "./CreateNewList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


import "./styles/listPanel.css";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

const ListPanel = () => {
  const { authenticateUser, isLoading, isLoggedIn, user } = useContext(
    AuthContext
  ) as AuthContextInterface;
  
  const [lists, setLists] = useState<ListInterface[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
    const [hidePanel, setHidePanel] = useState<boolean>(false)

  const handleGetLists = () => {
    getLists().then((ans) => {
      console.log("====>", ans);
      if (ans.status === 200) {
        setLists(ans.data);
      }
    });
  };

  const handleDeleteList = (id: string) => {
    deleteList(id).then((ans) => handleGetLists());
  };

  useEffect(() => {
    handleGetLists();
  }, []);

  const handleCreateNewList = (name: string) => {
    createList(name).then((ans) => handleGetLists());
  };

  return (
    <div className={`ListPanel ${hidePanel ? "hide" : ""}`}>
      <h2>List panel</h2>
      <CreateNewList handleCreateNewList={handleCreateNewList} lists={lists} />

      <ul className="list">
        {lists.map((list) => (
          <ListItem
            key={list._id}
            listItem={list}
            handleDeleteList={handleDeleteList}
            selectedId={selectedId}
            setSelectedId={setSelectedId}
          />
        ))}
      </ul>

      <div className="showHideIcon" onClick={()=>setHidePanel(!hidePanel)}>
        <FontAwesomeIcon icon={faChevronLeft} />
      </div>
    </div>
  );
};

export default ListPanel;
