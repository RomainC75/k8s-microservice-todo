import { useContext } from "react";
import { DataContext } from "../context/data.context";
import toast from 'react-hot-toast';
import { deleteTodo } from "../utils/todos-helper";
import { Button } from "@mui/material";

import { DataContextInterface } from "../@types/dataContext.type";

import "./styles/deleteModal.css";
import { deleteList } from "../utils/lists-helper";

interface DeleteModalInterface{
  isDeleteList?:boolean
}

const DeleteModal = ({isDeleteList}:DeleteModalInterface) => {
  const {
    setShowDeleteModal,
    todos,
    selectedTodoId,
    setSelectedTodoId,
    selectedListId,
    updateTodos,
    lists
  } = useContext(DataContext) as DataContextInterface;

  const handleDelete = () => {
    selectedTodoId &&
      deleteTodo(selectedTodoId).then((ans) => {
        setShowDeleteModal(false);
        updateTodos();
        setSelectedTodoId(null)
        toast.success(isDeleteList ? "List deleted" : "Todo deleted")
      }).catch(err=>{
        toast.error('todo not deleted')
      })
  }

  const getTargetName = ():string =>{
    let name=null
    if(isDeleteList && selectedListId){
      name = lists.find((list) => list._id.toString() === selectedListId)?.name
    }else if(selectedListId){
      name = todos.find((todo) => todo._id.toString() === selectedTodoId)?.name
    }
    return name ? name : "error"
  }

  return (
    <div className="DeleteModal">
      <div className="title">
        <p>DELETE THIS {isDeleteList ? "LIST" : "TODO"} ?</p>
      </div>

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
