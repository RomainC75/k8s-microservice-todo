import { ObjectId } from "mongoose"

export interface UserInterface{
    firstname:string,
    lastname: string,
    email:string,
    password: string
}

export interface UserCredentialsInterface{
    email:string,
    password: string
}

export interface MongoUserInterface{
    _id: ObjectId,
  email: string,
  password?: string,
  firstname: string,
  lastname: string,
  createdAt: Date,
  updatedAt: Date,
  __v?: number
}