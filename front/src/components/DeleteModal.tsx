import { useContext } from "react";
import { DataContext } from "../context/data.context";
import toast from 'react-hot-toast';
import { deleteTodo } from "../utils/todos-helper";
import { Button, dividerClasses } from "@mui/material";

import { DataContextInterface } from "../@types/dataContext.type";

import "./styles/deleteModal.css";
import { deleteList } from "../utils/lists-helper";

const DeleteModal = () => {
  const {
    setShowDeleteModal,
    todos,
    selectedTodoId,
    setSelectedTodoId,
    selectedListId,
    updateTodos,
    lists,
    isDeleteModalSupposedToDeleteList,
    handleGetLists,
    setSelectedListId
  } = useContext(DataContext) as DataContextInterface;

  const handleDelete = () => {
    if(isDeleteModalSupposedToDeleteList){
      selectedListId && deleteList(selectedListId).then(ans=>{
        setShowDeleteModal(false)
        handleGetLists()
        setSelectedListId(null)
        toast.success("List deleted")
      }).catch(err=>{
        toast.error('list not deleted')
      })
    }else{
      selectedTodoId &&
        deleteTodo(selectedTodoId).then((ans) => {
          setShowDeleteModal(false)
          updateTodos();
          setSelectedTodoId(null)
          toast.success("Todo deleted")
        }).catch(err=>{
          toast.error('todo not deleted')
        })
    }
  }

  const getTargetName = ():string =>{
    let name=null
    if(isDeleteModalSupposedToDeleteList && selectedListId){
      name = lists.find((list) => list._id.toString() === selectedListId)?.name
    }else if(selectedListId){
      name = todos.find((todo) => todo._id.toString() === selectedTodoId)?.name
    }
    return name ? name : "error"
  }

  return (
    <div className="DeleteModal">
      <div className="title">
        <p>DELETE THIS {isDeleteModalSupposedToDeleteList ? "LIST" : "TODO"} ?</p>
      </div>

      
      <div className="subtitle">{isDeleteModalSupposedToDeleteList && "This operation will delete any related to-do item."}</div>

      <div className="name">
      {getTargetName()}
      </div>
      <div className="selection">
        <Button
          onClick={() => handleDelete()}
          variant="contained"
          color="error"
        >
          Delete
        </Button>
        <Button onClick={() => setShowDeleteModal(false)} variant="contained">
          Cancel
        </Button>
      </div>
    </div>
  );
}

export default DeleteModal
