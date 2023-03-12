import { Response, NextFunction } from 'express'
import List from '../models/list.model'

import { AuthenticatedRequest } from '../@types/authenticatedRequest'
import { ListInterface } from '../@types/list'
import ListService from '../services/list.service'

export const getAllLists = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const listService = new ListService()
    const data = await listService.getAll(req.user.id)
    res.status(200).json(data)
  } catch (error) {
    next(error)
  }
}

export const createList = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId: string = req.user.id
    if (!('name' in req.body) || typeof req.body.name !== 'string') {
      return res.status(422).json({ message: 'need a name' })
    }
    const foundList: ListInterface | null = await List.findOne({
      name: req.body.name,
      userId,
    })
    if (foundList) {
      return res.status(409).json({ message: 'name already exists' })
    }

    const listService = new ListService()
    const ans: ListInterface = await listService.post(userId, req.body.name)

    res.status(201).json({
      message: 'todo created',
      list: {
        name: ans.name,
        _id: ans._id,
      },
    })
  } catch (error) {
    next(error)
  }
}

export const putList = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId: string = req.user.id
    const { listId } = req.params

    if (!('name' in req.body) || typeof req.body.name !== 'string') {
      return res.status(422).json({ message: 'need a name' })
    }

    const foundList: ListInterface | null = await List.findById(listId)
    if (!foundList) {
      return res.status(409).json({ message: 'list not found' })
    }
    if (foundList.userId.toString() !== userId) {
      return res.status(401).json({ message: 'unauthorized' })
    }

    const listService = new ListService()
    const { _id, name }: ListInterface = await listService.putNewName(
      listId,
      req.body.name
    )

    res.status(202).json({
      _id,
      name,
    })
  } catch (error) {
    next(error)
  }
}

export const deleteList = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { listId } = req.params
    const userId: string = req.user.id
    const foundList: ListInterface | null = await List.findById(listId)
    if (!foundList) {
      return res.status(409).json({ message: 'list not found' })
    }

    if (foundList.userId.toString() !== userId) {
      return res.status(401).json({ message: 'unauthorized' })
    }

    const listService = new ListService()
    await listService.deleteListAndTodos(listId)

    res.status(202).json({ message: 'list deleted' })
  } catch (error) {
    next(error)
  }
}
