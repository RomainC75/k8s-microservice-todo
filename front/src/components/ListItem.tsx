import React from 'react'
import { ListInterface } from '../@types/list.type'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

interface ListItemInterface{
    listItem:ListInterface
    handleDeleteList: (id:string)=>void 
}

const ListItem = ({listItem, handleDeleteList}:ListItemInterface) => {

  return (
    <div className="ListItem">
        <p>{listItem.name}</p>
        <FontAwesomeIcon icon={faTrash} onClick={()=>handleDeleteList(listItem._id)}/>
    </div>
  )
}

export default ListItem