import { useEffect, useContext } from 'react'
import ListItem from './ListItem'
import CreateNewList from './CreateNewList'

import { DataContext } from '../context/data.context'
import { DataContextInterface } from '../@types/dataContext.type'

import './styles/listPanel.css'
import ScrollingSection from './ScrollingSection'

const ListPanel = () => {
  // const { authenticateUser, isLoading, isLoggedIn, user } = useContext(
  //   AuthContext
  // ) as AuthContextInterface;
  const {
    selectedListId,
    setSelectedListId,
    isListPanelDisplayed,
    lists,
    handleGetLists,
    handleDeleteList,
    handleCreateNewList,
  } = useContext(DataContext) as DataContextInterface

  useEffect(() => {
    handleGetLists()
  }, [])

  useEffect(() => {
    const isSelecteListStillInLists: boolean = lists.some(
      list => list._id === selectedListId
    )
    if (!isSelecteListStillInLists) {
      setSelectedListId(null)
    }
  }, [lists])

  return (
    <section className={`ListPanel ${!isListPanelDisplayed ? 'hide' : ''}`}>
      <h2>ALL LISTS</h2>
      <ScrollingSection
        margin={20}
        menuName={`list menu (${lists.length})`}
        isOpenedByDefault
      >
        <ul className="list">
          {lists.map(list => (
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
      <ScrollingSection margin={20} menuName="creation menu" isOpenedByDefault>
        <CreateNewList
          handleCreateNewList={handleCreateNewList}
          lists={lists}
        />
      </ScrollingSection>
    </section>
  )
}

export default ListPanel
