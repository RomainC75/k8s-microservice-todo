import chai from 'chai'
const expect = chai.expect
import { describe, it, after, before } from 'mocha'
import { new_user_info } from './utils/utils'
require('../db')
import axios, { AxiosResponse } from 'axios'
import bcrypt from 'bcrypt'
// const should = chai.should()

import User from '../models/user.model'

import dotenv from 'dotenv'
dotenv.config()

// const API_URL:string = process.env.API_URL || 'http://localhost:5010'

import {
  UserCredentialsInterface,
  UserInterface,
} from '../@types/userInterface'

import { SigninResponseInterface } from '../@types/signinResponse'
import { signin } from './utils/auth.axios.utils'
import { AxiosServiceResponse } from './@types/axios.type'
import { getLists } from './utils/list.axios.utils'
let token:null|string = null

describe('/todo/list Route : ', () => {
  before(async () => {
    try {
      const new_user: UserInterface = { ...new_user_info }
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
      console.log('ans : ', ans)
      token = 'data' in ans && 'token' in ans.data && typeof ans.data.token==='string' ? ans.data.token : null
    } catch (error) {
      console.log('==>',error)
    }
  })
  it('should get an empty array of list if there is no list for the user', async () => {
    try {
      const ans: AxiosServiceResponse = await getLists(token)
      console.log('lists : ', ans)

    } catch (error) {
      console.log('LIST ERROR : ',error)
    }
    
  })

  // it('should throw an error if the list does not contain a name', async () => {
  //   try {
  //     const 
  //   } catch (error) {
      
  //   }
    
  // })

  after(async ()=> {
    await User.findOneAndDelete({email:new_user_info.email})
  })
  
})
