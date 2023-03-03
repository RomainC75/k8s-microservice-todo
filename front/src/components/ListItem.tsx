import React,{useState} from 'react'
import { ListInterface } from '../@types/list.type'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

interface ListItemInterface{
    listItem:ListInterface
    handleDeleteList: (id:string)=>void 
    setSelectedId:(id:string)=>void
    selectedId:string|null
}

const ListItem = ({listItem, handleDeleteList, setSelectedId, selectedId}:ListItemInterface) => {
  

  return (
    <li className={`ListItem ${listItem._id===selectedId && "selected"}`}>
        <p onClick={()=>setSelectedId(listItem._id)}>{listItem.name}</p>
        <FontAwesomeIcon className="trash" icon={faTrash} onClick={()=>handleDeleteList(listItem._id)}/>
    </li>
  )
}

export default ListItem