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
import { createList } from '../controllers/list.controller'
import { API_URL } from './utils/constants'
import { tokenHeader } from './utils/axios.headers.utils'
import List from '../models/list.model'
let token: null | string = null

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
      token =
        'data' in ans &&
        'token' in ans.data &&
        typeof ans.data.token === 'string'
          ? ans.data.token
          : null
    } catch (error) {
      console.log('==>', error)
    }
  })
  it('should get an empty array of list if there is no list for the user', async () => {
    try {
      const response: AxiosServiceResponse = await getLists(token)
      console.log('lists : ', response)
      expect(response.status).to.be.equal(200)
      expect(response.data).to.be.an('array')
      expect(response.data).to.have.length(0)
    } catch (error) {
      expect(error.response.status).to.be.equal(200)
    }
  })

  it('should throw an error if the list does not contain a name', async () => {
    try {
      const response: AxiosResponse = await axios.post(
        `${API_URL}/todo/list`,
        {},
        tokenHeader(token)
      )
      expect(response.status).not.to.be.equal(201)
    } catch (error) {
      expect(error.response.status).to.equal(422)
      expect(error.response.data).to.be.an('object')
      expect(error.response.data).to.have.all.keys('message')
      expect(error.response.data.message).to.be.equal('need a name')
    }
  })

  it('should throw an error if the name of list is a number', async () => {
    try {
      const name = 123
      const response: AxiosResponse = await axios.post(
        `${API_URL}/todo/list`,
        { name },
        tokenHeader(token)
      )
      expect(response.status).not.to.be.equal(201)
    } catch (error) {
      expect(error.response.status).to.equal(422)
      expect(error.response.data).to.be.an('object')
      expect(error.response.data).to.have.all.keys('message')
      expect(error.response.data.message).to.be.equal('need a name')
    }
  })

  it('should create a new list', async () => {
    try {
      const name = 'myList'
      const response: AxiosResponse = await axios.post(
        `${API_URL}/todo/list`,
        {
          name,
        },
        tokenHeader(token)
      )
      expect(response.status).to.be.equal(201)
      expect(response.data).to.be.an('object')
      expect(response.data).to.have.all.keys('message', 'list')
      expect(response.data.message).to.be.equal('todo created')
    } catch (error) {
      expect(error.response.status).not.to.equal(201)
    }
  })

  it('should not create a new list if the name exists', async () => {
    try {
      const name = 'myList'
      const response: AxiosResponse = await axios.post(
        `${API_URL}/todo/list`,
        {
          name,
        },
        tokenHeader(token)
      )
      expect(response.status).not.to.be.equal(201)
    } catch (error) {
      expect(error.response.status).to.be.equal(409)
    }
  })

  

  after(async () => {
    const user = await User.findOne({ email: new_user_info.email })
    await List.deleteMany({ userId: user._id.toString() })
    await User.findOneAndDelete({ email: new_user_info.email })
  })
})
