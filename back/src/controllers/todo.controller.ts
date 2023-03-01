import express, { Express, Request, Response, NextFunction } from 'express'
const User = require('../models/user.model')
const List = require('../models/list.model')
const Todo = require('../models/todo.model')

import { AuthenticatedRequest } from '../@types/authenticatedRequest'
import { ListInterface } from '../@types/list'
import { TodoInterface } from '../@types/todo.type'
import { listUpdateFilter } from '../utils/list_handler'

export const getAllTodos = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
        const listId:string = req.params.listId
        const foundList:ListInterface|null = await List.findById(listId)
        if (!foundList) {
            return res.status(409).json({ message: "list doesn't exist" })
        }
        if(foundList.userId.toString() !== req.user.id){
            return res.status(401).json({ message: 'unauthorized' })
        }
        const foundTodos = await Todo.find({listId})
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
        const listId:string = req.params.listId
        const foundList:ListInterface|null = await List.findById(listId)
        if (!foundList) {
            return res.status(409).json({ message: "list doesn't exist" })
        }
        if(foundList.userId.toString() !== req.user.id){
            return res.status(401).json({ message: 'unauthorized' })
        }
        const ans = await Todo.create({...req.body,listId})
        console.log('ans', ans)
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
        const todoId:string = req.params.todoId
        const body:Object = req.body
        const foundTodo:TodoInterface|null = await Todo.findById(todoId)
        if (!foundTodo) {
            return res.status(409).json({ message: "todo doesn't exist" })
        }
        const foundList:ListInterface|null = await List.findById(foundTodo.listId)
        if(foundList.userId.toString() !== req.user.id){
            return res.status(401).json({ message: 'unauthorized' })
        }
        
        // protect from 
        const updatedTodo = listUpdateFilter(body)
        
        const ans = await Todo.findByIdAndUpdate(todoId,updatedTodo,{new:true})
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

  }