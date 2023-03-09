import { ObjectId } from 'mongoose'

export interface NewTodoInterface {
  name: string
  description?: string
  deadLine: string
  isDone: boolean
}

export interface TodoInterface extends NewTodoInterface {
  _id: ObjectId
  listId: ObjectId
  createdAt: string
  updatedAt: string
  __v: number
}
