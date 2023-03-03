import React, { useEffect } from "react";
import { useState, useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { AuthContextInterface } from "../@types/authContext.type";
import { Navigate } from "react-router-dom";
import { ListInterface } from "../@types/list.type";
import { createList, deleteList, getLists } from "../utils/lists-helper";
import ListItem from "./ListItem";
import CreateNewList from "./CreateNewList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


import "./styles/listPanel.css";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { DataContext } from "../context/data.context";
import { DataContextInterface } from "../@types/dataContext.type";

const ListPanel = () => {
  const { authenticateUser, isLoading, isLoggedIn, user } = useContext(
    AuthContext
  ) as AuthContextInterface;
  const {selectedListId, setSelectedListId} = useContext(DataContext) as DataContextInterface

  const [lists, setLists] = useState<ListInterface[]>([]);
    const [hidePanel, setHidePanel] = useState<boolean>(false)

  const handleGetLists = () => {
    getLists().then((ans) => {
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
    createList(name).then((ans) => {
      // select the new created list. No async problem ???
      setSelectedListId(ans.data.list._id)
      handleGetLists()

    });
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
            selectedListId={selectedListId}
            setSelectedListId={setSelectedListId}
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
