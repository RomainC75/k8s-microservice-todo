import { ListInterface } from '../@types/list'
import List from '../models/list.model'
import Todo from '../models/todo.model'

export default class ListService {
  getAll = async (userId: string): Promise<ListInterface[]> => {
    const foundLists: ListInterface[] = await List.find({ userId })

    const data: ListInterface[] = await Promise.all(
      foundLists.map(async (list: ListInterface) => {
        const todosNumber = await Todo.countDocuments({ listId: list._id })
        return {
          ...list.toObject(),
          todosNumber,
        }
      })
    )
    return data
  }

  post = async (userId: string, name: string): Promise<ListInterface> => {
    const list: ListInterface = await List.create({
      name: name,
      userId,
    })
    return list
  }

  putNewName = async (listId: string, name: string): Promise<ListInterface> => {
    const list: ListInterface = await List.findByIdAndUpdate(
      listId,
      { name },
      { new: true }
    )
    return list
  }

  deleteListAndTodos = async (listId: string): Promise<void> => {
    await Todo.deleteMany({ listId })
    await List.findByIdAndDelete(listId)
  }
}
