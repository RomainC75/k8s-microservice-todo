import { ObjectId } from 'mongoose'

interface TodoInterface {
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

interface UpdatableTodoDataInterface {
  name: string
  description?: string
  deadLine: Date | string
  isDone: boolean
}

export { TodoInterface, UpdatableTodoDataInterface }
