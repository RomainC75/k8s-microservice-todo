import bcrypt from 'bcrypt'
import { MongoUserInterface } from '../@types/userInterface'
import User from '../models/user.model'

export default class AuthService {
  signup = async (user): Promise<void> => {
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(user.password, salt)
    await User.create({
      ...user,
      password: hash,
    })
  }

  isEmailInDb = async (email: string): Promise<boolean> => {
    const foundUser = await User.findOne({ email })
    return foundUser ? true : false
  }

  getUserByEmail = async (
    email: string
  ): Promise<MongoUserInterface | null> => {
    return await User.findOne({ email })
  }
}
