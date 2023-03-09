import { ObjectId } from "mongoose"

interface UserInterface{
    firstname:string,
    lastname: string,
    email:string,
    password: string
}

interface UserCredentialsInterface{
    email:string,
    password: string
}

interface MongoUserInterface{
    _id: ObjectId,
  email: string,
  password?: string,
  firstname: string,
  lastname: string,
  createdAt: Date,
  updatedAt: Date,
  __v?: number
}

export { UserInterface, UserCredentialsInterface, MongoUserInterface}