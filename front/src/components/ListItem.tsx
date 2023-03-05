import { useContext } from 'react'
import { ListInterface } from '../@types/list.type'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { DataContext } from '../context/data.context'
import { DataContextInterface } from '../@types/dataContext.type'

interface ListItemInterface{
    listItem:ListInterface
    handleDeleteList: (id:string)=>void 
    setSelectedListId:(id:string)=>void
    selectedListId:string|null
}

const ListItem = ({listItem, handleDeleteList, setSelectedListId, selectedListId}:ListItemInterface) => {
  const {
    setIsDeleteModalSupposedToDeleteList,
    setShowDeleteModal
  } = useContext(DataContext) as DataContextInterface;

  const handleDelete = () =>{
    setIsDeleteModalSupposedToDeleteList(true)
    setShowDeleteModal(true)
  }

  return (
    <li className={`ListItem ${listItem._id===selectedListId && "selected"}`}>
        <p onClick={()=>setSelectedListId(listItem._id)}>{listItem.name}</p>
        {/* <FontAwesomeIcon className="trash" icon={faTrash} onClick={()=>handleDeleteList(listItem._id)}/> */}
        <FontAwesomeIcon className="trash" icon={faTrash} onClick={()=>handleDelete()}/>
    </li>
  )
}

export default ListItem