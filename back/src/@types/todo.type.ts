import { ObjectId } from "mongoose"

export interface TodoInterface {
  _id: ObjectId
  listId: ObjectId
  name: string
  description?: string
  deadLine: Date
  isDone: boolean
  createdAt: string
  updatedAt: string
  __v: number
}

export interface UpdatableTodoDataInterface{
  name: string
  description?: string
  deadLine: Date
  isDone: boolean
}