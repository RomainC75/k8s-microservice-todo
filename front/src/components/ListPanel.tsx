import React, { useEffect } from "react";
import { useState, useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { AuthContextInterface } from "../@types/authContext.type";
import { Navigate } from "react-router-dom";
import { ListInterface } from "../@types/list.type";
import { createList, deleteList, getLists } from "../utils/axios-helper";
import ListItem from "./ListItem";
import CreateNewList from "./CreateNewList";

const ListPanel = () => {
  const { authenticateUser, isLoading, isLoggedIn, user } = useContext(
    AuthContext
  ) as AuthContextInterface;
  const [lists, setLists] = useState<ListInterface[]>([]);

  const handleGetLists = () => {
    getLists().then((ans) => {
      console.log("====>", ans);
      if (ans.status === 200) {
        setLists(ans.data);
      }
    });
  };

  const handleDeleteList = (id:string)=>{
    deleteList(id).then(ans=>handleGetLists())
  }

  useEffect(() => {
    handleGetLists();
  }, []);

  const handleCreateNewList = (name: string) => {
    createList(name).then(ans=>handleGetLists());
  };

  return (
    <div className="ListPanel">
      <CreateNewList handleCreateNewList={handleCreateNewList} lists={lists} />
      <div>
        {lists.map((list) => (
          <ListItem key={list._id} listItem={list} handleDeleteList={handleDeleteList}/>
        ))}
      </div>
    </div>
  );
};

export default ListPanel;
