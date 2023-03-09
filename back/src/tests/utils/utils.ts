import { UserInterface } from "../../@types/userInterface"
import dotenv from 'dotenv'
dotenv.config()

// export const API_URL = `${process.env.DOMAIN}:${process.env.PORT}`

export const new_user_info:UserInterface = {
  firstname: 'Dummy',
  lastname: 'User',
  email: 'dummy.user@gmail.com',
  password: 'azerty123',
}
