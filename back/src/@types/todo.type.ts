import { ObjectId } from "mongoose"

export interface TodoInterface {
  _id: ObjectId
  listId: ObjectId
  name: string
  description?: string
  isDone: boolean
  createdAt: string
  updatedAt: string
  __v: number
}
