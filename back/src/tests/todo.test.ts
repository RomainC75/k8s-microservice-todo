import chai from 'chai'
const expect = chai.expect
import { describe, it, after, before } from 'mocha'
import {
  new_users,
} from './utils/constants/user.utils'
require('../db')
import axios, { AxiosResponse } from 'axios'

import User from '../models/user.model'

import dotenv from 'dotenv'
dotenv.config()
import { AxiosServiceResponse } from './@types/axios.type'
import { getLists } from './utils/list.axios.utils'

import { API_URL } from './utils/constants/api.utils'
import { tokenHeader } from './utils/axios.headers.utils'
import List from '../models/list.model'
import { UserInfosInterface } from './@types/userInfos.type'
import { createUser, deleteUser } from './utils/user.handler'
import { ListInterface } from '../@types/list'

let listId: string | null = null
let usersInfos: UserInfosInterface[] = []

describe('/todo/list Route : ', () => {
  before(async () => {
    try {
      usersInfos = await Promise.all(new_users.map((user) => createUser(user)))
    } catch (error) {
      console.log('==>', error)
    }
  })

  // == GET ==

  it('GET /list => should get an empty array of list if there is no list for the user', async () => {
    try {
      const response: AxiosServiceResponse = await getLists(usersInfos[0].token)
      console.log('lists : ', response)
      expect(response.status).to.be.equal(200)
      expect(response.data).to.be.an('array')
      expect(response.data).to.have.length(0)
    } catch (error) {
      expect(error.response.status).to.be.equal(200)
    }
  })

  // == POST ==

  it('POST /list => should throw an error if the list does not contain a name', async () => {
    try {
      const response: AxiosResponse = await axios.post(
        `${API_URL}/todo/list`,
        {},
        tokenHeader(usersInfos[0].token)
      )
      expect(response.status).not.to.be.equal(201)
    } catch (error) {
      expect(error.response.status).to.equal(422)
      expect(error.response.data).to.be.an('object')
      expect(error.response.data).to.have.all.keys('message')
      expect(error.response.data.message).to.be.equal('need a name')
    }
  })

  it('POST /list => should throw an error if the name of list is a number', async () => {
    try {
      const name = 123
      const response: AxiosResponse = await axios.post(
        `${API_URL}/todo/list`,
        { name },
        tokenHeader(usersInfos[0].token)
      )
      expect(response.status).not.to.be.equal(201)
    } catch (error) {
      expect(error.response.status).to.equal(422)
      expect(error.response.data).to.be.an('object')
      expect(error.response.data).to.have.all.keys('message')
      expect(error.response.data.message).to.be.equal('need a name')
    }
  })

  it('POST /list => should create a new list', async () => {
    try {
      const name = 'myList'
      const response: AxiosResponse = await axios.post(
        `${API_URL}/todo/list`,
        {
          name,
        },
        tokenHeader(usersInfos[0].token)
      )
      expect(response.status).to.be.equal(201)
      expect(response.data).to.be.an('object')
      expect(response.data).to.have.all.keys('message', 'list')
      expect(response.data.message).to.be.equal('todo created')

      expect(response.data.list).to.have.all.keys('name', '_id')
      expect(response.data.list._id).to.be.a('string')
      listId = response.data.list._id
    } catch (error) {
      expect(error.response.status).not.to.equal(201)
    }
  })

  it('POST /list => should not create a new list if the name exists', async () => {
    try {
      const name = 'myList'
      const response: AxiosResponse = await axios.post(
        `${API_URL}/todo/list`,
        {
          name,
        },
        tokenHeader(usersInfos[0].token)
      )
      expect(response.status).not.to.be.equal(201)
    } catch (error) {
      expect(error.response.status).to.be.equal(409)
    }
  })

  // == PUT ==

  it('PUT /list/:listId => should throw an error if the list does not contain a name', async () => {
    try {
      const response: AxiosResponse = await axios.put(
        `${API_URL}/todo/list/${listId}`,
        {},
        tokenHeader(usersInfos[0].token)
      )
      expect(response.status).not.to.be.equal(202)
    } catch (error) {
      expect(error.response.status).to.equal(422)
      expect(error.response.data).to.be.an('object')
      expect(error.response.data).to.have.all.keys('message')
      expect(error.response.data.message).to.be.equal('need a name')
    }
  })

  it('PUT /list/:listId => should throw an error if the is a number', async () => {
    try {
      const name = 123
      const response: AxiosResponse = await axios.put(
        `${API_URL}/todo/list/${listId}`,
        { name },
        tokenHeader(usersInfos[0].token)
      )
      expect(response.status).not.to.be.equal(202)
    } catch (error) {
      expect(error.response.status).to.equal(422)
      expect(error.response.data).to.be.an('object')
      expect(error.response.data).to.have.all.keys('message')
      expect(error.response.data.message).to.be.equal('need a name')
    }
  })

  it('PUT /list/:listId => should not find the list the id is invalid', async () => {
    try {
      const fakeListId = 'aaaaaaaaaaaaaaaaaaaaaaaa'
      const name = 'newList2'
      const response: AxiosResponse = await axios.put(
        `${API_URL}/todo/list/${fakeListId}`,
        { name },
        tokenHeader(usersInfos[0].token)
      )
      expect(response.status).not.to.be.equal(202)
    } catch (error) {
      expect(error.response.status).to.be.equal(409)
      expect(error.response.data).to.be.an('object')
      expect(error.response.data).to.have.all.keys('message')
      expect(error.response.data.message).to.be.equal('list not found')
    }
  })

  it('PUT /list/:listId => should change not change the list if the user is not authorized', async () => {
    try {
      const user0List = await List.findOne({ userId: usersInfos[0].userId })
      const name = 'myList3'
      const response: AxiosResponse = await axios.put(
        `${API_URL}/todo/list/${user0List._id}`,
        { name },
        tokenHeader(usersInfos[1].token)
      )
      expect(response.status).not.to.be.equal(202)
    } catch (error) {
      expect(error.response.status).to.be.equal(401)
      expect(error.response.data).to.be.an('object')
      expect(error.response.data).to.have.all.keys('message')
      expect(error.response.data.message).to.be.equal('unauthorized')
    }
  })

  it('PUT /list/:listId => should change the list name ', async () => {
    try {
      const name = 'myNewList'
      const response: AxiosResponse = await axios.put(
        `${API_URL}/todo/list/${listId}`,
        { name },
        tokenHeader(usersInfos[0].token)
      )
      expect(response.status).to.be.equal(202)
      expect(response.data).to.be.an('object')
      expect(response.data).to.have.all.keys('_id', 'name')
      expect(response.data.name).to.be.equal(name)
    } catch (error) {
      expect(error.response.status).to.equal(202)
    }
  })

  // == Delete

  it('DELETE /list/:listId => should return an error if the id is invalid', async () => {
    try {
      const fakeListId = 'aaaaaaaaaaaaaaaaaaaaaaaa'
      const response: AxiosResponse = await axios.delete(
        `${API_URL}/todo/list/${fakeListId}`,
        tokenHeader(usersInfos[0].token)
      )
      expect(response.status).not.to.be.equal(202)
     
    } catch (error) {
      expect(error.response.status).to.equal(409)
      expect(error.response.data).to.be.an('object')
      expect(error.response.data).to.have.all.keys('message')
      expect(error.response.data.message).to.be.equal('list not found')
    }
  })

  it('PUT /list/:listId => should change not change the list if the user is not authorized', async () => {
    try {
      const user0List:ListInterface = await List.findOne({ userId: usersInfos[0].userId })
      const response: AxiosResponse = await axios.delete(
        `${API_URL}/todo/list/${user0List._id}`,
        tokenHeader(usersInfos[1].token)
      )
      expect(response.status).not.to.be.equal(202)
    } catch (error) {
      expect(error.response.status).to.be.equal(401)
      expect(error.response.data).to.be.an('object')
      expect(error.response.data).to.have.all.keys('message')
      expect(error.response.data.message).to.be.equal('unauthorized')
    }
  })

  it('DELETE /list/:listId => should delete the list ', async () => {
    try {
      const response: AxiosResponse = await axios.delete(
        `${API_URL}/todo/list/${listId}`,
        tokenHeader(usersInfos[0].token)
      )
      expect(response.status).to.be.equal(202)
      expect(response.data).to.be.an('object')
      expect(response.data).to.have.all.keys('message')
      expect(response.data.message).to.be.equal('list deleted')
    } catch (error) {
      expect(error.response.status).to.equal(202)
    }
  })

  after(async () => {
    const user = await User.findOne({ email: new_users[0].email })
    await List.deleteMany({ userId: user._id.toString() })
    // await User.findOneAndDelete({ email: new_user_info.email })
    await Promise.allSettled(new_users.map((user) => deleteUser(user.email)))
  })
})
