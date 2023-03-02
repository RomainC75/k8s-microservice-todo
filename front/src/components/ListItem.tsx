import React from 'react'
import { ListInterface } from '../@types/list.type'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

interface ListItemInterface{
    listItem:ListInterface
}


const ListItem = ({listItem}:ListItemInterface) => {
  return (
    <div className="ListItem">
        <p>{listItem.name}</p>
        <FontAwesomeIcon icon={faTrash} />
    </div>
  )
}

export default ListItem