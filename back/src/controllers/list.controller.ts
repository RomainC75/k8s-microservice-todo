import express, { Express, Request, Response, NextFunction } from 'express'
const User = require('../models/user.model')
const List = require('../models/list.model')
const Todo = require('../models/todo.model')

import { AuthenticatedRequest } from '../@types/authenticatedRequest'
import { ListInterface } from '../@types/list'

export const getAllLists = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const foundLists: ListInterface[] = await List.find({ userId: req.user.id })
    const data = await Promise.all(foundLists.map(async(list:ListInterface)=>{
        const todosNumber = await Todo.countDocuments({listId:list._id})
        return {
          ...list.toObject(),
          todosNumber
        }
    }))
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
    const ans: ListInterface = await List.create({
      name: req.body.name,
      userId,
    })
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

    const { _id, name }: ListInterface = await List.findByIdAndUpdate(
      listId,
      { name: req.body.name },
      { new: true }
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
    
    await Todo.deleteMany({listId})

    const ans = await List.findByIdAndDelete(listId)
    res.status(202).json({message: 'list deleted'})
  } catch (error) {
    next(error)
  }
}
