import { useContext } from 'react'
import { ListInterface } from '../@types/list.type'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { DataContext } from '../context/data.context'
import { DataContextInterface } from '../@types/dataContext.type'

import './styles/listItem.css'

interface ListItemInterface {
  listItem: ListInterface
  handleDeleteList: (id: string) => void
  setSelectedListId: (id: string) => void
  selectedListId: string | null
}

const ListItem = ({
  listItem,
  setSelectedListId,
  selectedListId,
}: ListItemInterface) => {
  const { setIsDeleteModalSupposedToDeleteList, setShowDeleteModal } =
    useContext(DataContext) as DataContextInterface

  const handleDelete = () => {
    setIsDeleteModalSupposedToDeleteList(true)
    setShowDeleteModal(true)
    setSelectedListId(listItem._id)
  }

  return (
    <li className={`ListItem ${listItem._id === selectedListId && 'selected'}`}>
      <p onClick={() => setSelectedListId(listItem._id)}>
        {listItem.name}{' '}
        <span className="">
          {'todosNumber' in listItem ? listItem.todosNumber : '?'}
        </span>
      </p>
      {/* <FontAwesomeIcon className="trash" icon={faTrash} onClick={()=>handleDeleteList(listItem._id)}/> */}
      <FontAwesomeIcon
        className="trash"
        icon={faTrash}
        onClick={() => handleDelete()}
      />
    </li>
  )
}

export default ListItem
