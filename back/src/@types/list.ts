import { ObjectId } from "mongoose"

export interface ListInterface {
  _id: ObjectId
  name: string
  userId: ObjectId
  createdAt: string
  updatedAt: string
  __v: number
  todosNumber:number
  toObject:()=>ListInterface
}
