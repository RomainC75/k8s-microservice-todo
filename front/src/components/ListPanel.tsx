import { useEffect } from "react";
import { useState, useContext } from "react";
import { ListInterface } from "../@types/list.type";
import { createList, deleteList, getLists } from "../utils/lists-helper";
import ListItem from "./ListItem";
import CreateNewList from "./CreateNewList";

import { DataContext } from "../context/data.context";
import { DataContextInterface } from "../@types/dataContext.type";

import "./styles/listPanel.css";
import ScrollingSection from "./ScrollingSection";

const ListPanel = () => {
  // const { authenticateUser, isLoading, isLoggedIn, user } = useContext(
  //   AuthContext
  // ) as AuthContextInterface;
  const {
    selectedListId,
    setSelectedListId,
    isListPanelDisplayed,
    lists,
    setLists,
  } = useContext(DataContext) as DataContextInterface;

  const handleGetLists = () => {
    getLists().then((ans) => {
      if (ans.status === 200) {
        setLists(ans.data);
      }
    });
  };

  const handleDeleteList = (id: string) => {
    deleteList(id).then((ans) => {
      handleGetLists();
    });
  };

  useEffect(() => {
    handleGetLists();
  }, []);

  useEffect(() => {
    const isSelecteListStillInLists: boolean = lists.some(
      (list) => list._id === selectedListId
    );
    if (!isSelecteListStillInLists) {
      setSelectedListId(null);
    }
  }, [lists]);

  const handleCreateNewList = (name: string) => {
    createList(name).then((ans) => {
      // select the new created list. No async problem ???
      setSelectedListId(ans.data.list._id);
      handleGetLists();
    });
  };

  return (
    <section className={`ListPanel ${!isListPanelDisplayed ? "hide" : ""}`}>
      <h2>ALL LISTS({lists.length})</h2>
      <h3>list menu</h3>
      <ScrollingSection>
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
      </ScrollingSection>
      <h3>creation menu</h3>
      <ScrollingSection>
        <CreateNewList
          handleCreateNewList={handleCreateNewList}
          lists={lists}
        />
      </ScrollingSection>
    </section>
  );
};

export default ListPanel;
