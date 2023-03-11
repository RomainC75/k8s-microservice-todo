import bcrypt from 'bcrypt'

import { UserInterface } from "../../@types/userInterface"
import User from '../../models/user.model'
import { AxiosServiceResponse } from '../@types/axios.type'
import { UserInfosInterface } from "../@types/userInfos.type"
import { signin } from './auth.axios.utils'

const createUser = async (new_user:UserInterface): Promise<UserInfosInterface> => {
    return new Promise(async (resolve, reject) => {
      try {
        const salt = await bcrypt.genSalt(10)
        const hash: string = await bcrypt.hash(new_user.password, salt)
        await User.create({
          ...new_user,
          password: hash,
        })
        const ans: AxiosServiceResponse = await signin(
          new_user.email,
          new_user.password
        )
        if ('data' in ans && 'token' in ans.data && 'userId' in ans.data) {
          resolve ({
            token : typeof ans.data.token === 'string' && ans.data.token,
            userId : typeof ans.data.userId === 'string' && ans.data.userId
          })
        }else{
          reject(null)
        }
      } catch (error) {
        console.log('createUser error : ', error)
        reject(null)
      }
    })
  }
  
  const deleteUser = async (email:string):Promise<boolean> =>{
    return new Promise ( async (resolve, reject)=>{
      try {
        await User.findOneAndDelete({ email })
        resolve(true)
      } catch (error) {
        reject(false)
      }
    })
  }

export{
    createUser, deleteUser
}