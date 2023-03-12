import { Response, NextFunction } from 'express'
// import User from '../models/user.model'
import List from '../models/list.model'
import Todo from '../models/todo.model'

import { AuthenticatedRequest } from '../@types/authenticatedRequest'
import { ListInterface } from '../@types/list'
import { TodoInterface, UpdatableTodoDataInterface } from '../@types/todo.type'
import { verifyAndCleanTodoUpdateData } from '../utils/list_handler'

export const getAllTodos = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const listId: string = req.params.listId
    const foundList: ListInterface | null = await List.findById(listId)
    if (!foundList) {
      return res.status(409).json({ message: "list doesn't exist" })
    }
    if (foundList.userId.toString() !== req.user.id) {
      return res.status(401).json({ message: 'unauthorized' })
    }
    const foundTodos = await Todo.find({ listId })
    res.status(200).json(foundTodos)
  } catch (error) {
    next(error)
  }
}

export const createTodo = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const listId: string = req.params.listId
    const foundList: ListInterface | null = await List.findById(listId)
    if (!foundList) {
      return res.status(409).json({ message: "list doesn't exist" })
    }
    if (foundList.userId.toString() !== req.user.id) {
      return res.status(401).json({ message: 'unauthorized' })
    }
    if (!req.body.name) {
      return res.status(409).json({ message: 'name is needed' })
    }

    const foundTodo: TodoInterface | null = await Todo.findOne({
      name: req.body.name,
      listId,
    })
    if (foundTodo) {
      return res.status(401).json({ message: 'todo name already used' })
    }

    const ans = await Todo.create({ ...req.body, listId })
    res.status(201).json(ans)
  } catch (error) {
    next(error)
  }
}

export const putTodo = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const todoId: string = req.params.todoId
    const body: object = req.body

    const foundTodo: TodoInterface | null = await Todo.findById(todoId)
    if (!foundTodo) {
      return res.status(409).json({ message: "todo doesn't exist" })
    }

    const foundList: ListInterface | null = await List.findById(
      foundTodo.listId
    )
    if (foundList.userId.toString() !== req.user.id) {
      return res.status(401).json({ message: 'unauthorized' })
    }

    const updatedTodo: UpdatableTodoDataInterface | null =
      verifyAndCleanTodoUpdateData(body)
    if (!updatedTodo) {
      return res.status(409).json({
        message:
          'need 4 keys : name, deadLine, isDone -- authorized key: descritpion ',
      })
    }

    const ans = await Todo.findByIdAndUpdate(todoId, updatedTodo, { new: true })
    res.status(202).json(ans)
  } catch (error) {
    next(error)
  }
}

export const deleteTodo = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const todoId: string = req.params.todoId

    const foundTodo: TodoInterface | null = await Todo.findById(todoId)
    if (!foundTodo) {
      return res.status(409).json({ message: "todo doesn't exist" })
    }

    const foundList: ListInterface | null = await List.findById(
      foundTodo.listId
    )
    if (foundList.userId.toString() !== req.user.id) {
      return res.status(401).json({ message: 'unauthorized' })
    }

    await Todo.findByIdAndDelete(todoId)

    res.status(202).json({ message: 'todo deleted' })
  } catch (error) {
    next(error)
  }
}
