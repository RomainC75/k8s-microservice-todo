import chai from 'chai'
const expect = chai.expect
import { describe, it, after } from 'mocha'
import { new_user_info } from './utils/utils'
require('../db')
import axios, { AxiosResponse } from 'axios'

// const should = chai.should()

import User from '../models/user.model'

import dotenv from 'dotenv'
dotenv.config()

const API_URL = 'http://localhost:5010'

import {
UserCredentialsInterface,
  UserInterface,
} from '../@types/userInterface'

import { SigninResponseInterface } from '../@types/signinResponse'

describe('/auth/signup Route : ', () => {
  it('should return an error if firstname is missing', async () => {
    console.log('API URL :', API_URL)
    try {
      const incompleteUser: UserInterface = { ...new_user_info }
      delete incompleteUser.lastname

      const response: AxiosResponse = await axios.post(
        `${API_URL}/auth/signup`,
        incompleteUser
      )
      expect(response.status).not.to.be.equal(201)
    } catch (error) {
      if(axios.isAxiosError(error)){
        expect(error.response.status).to.be.equal(422)
        expect(error.response.data.message).to.be.equal(
          'the request needs 4 fields : firstname, lastname, email, password'
        )
      }else{
        console.log('error',error)
      }
    }
  })

  it('should return an error if password is missing', async () => {
    try {
      const incompleteUser: UserInterface = { ...new_user_info }
      delete incompleteUser.password

      const response: AxiosResponse = await axios.post(
        `${API_URL}/auth/signup`,
        incompleteUser
      )

      expect(response.status).not.to.be.equal(201)
    } catch (error) {
      expect(error.response.status).to.be.equal(422)
      expect(error.response.data.message).to.be.equal(
        'the request needs 4 fields : firstname, lastname, email, password'
      )
    }
  })

  it('should return an error if lastname is a number', async () => {
    try {
      const incompleteUser: any = { ...new_user_info }
      incompleteUser.lastname = 983674

      const response: AxiosResponse = await axios.post(
        `${API_URL}/auth/signup`,
        incompleteUser
      )

      expect(response.status).not.to.be.equal(201)
    } catch (error) {
      expect(error.response.status).to.be.equal(422)
      expect(error.response.data.message).to.be.equal(
        'each field should be a string'
      )
    }
  })

  it('should return "user created"', async () => {
    try {
      const completeUser = { ...new_user_info }
      const response: AxiosResponse = await axios.post(
        `${API_URL}/auth/signup`,
        completeUser
      )
      expect(response.status).to.be.equal(201)
    } catch (error) {
      expect(error.response.status).not.to.be.equal(201)
    }
  })

  it('should return "user already exists"', async () => {
    try {
      const response: AxiosResponse = await axios.post(
        `${API_URL}/auth/signup`,
        new_user_info
      )

      expect(response.status).not.to.be.equal(201)
    } catch (error) {
      expect(error.response.status).to.be.equal(409)
      expect(error.response.data.message).to.be.equal('user already exists')
    }
  })
})

describe('/auth/signin Route : ', () => {
  it('should return an error if there is no email field', async () => {
    try {
      const credentials: UserCredentialsInterface = {
        email: new_user_info.email,
        password: new_user_info.password,
      }
      delete credentials.email

      const response: AxiosResponse = await axios.post(
        `${API_URL}/auth/signin`,
        credentials
      )
      expect(response.status).not.to.be.equal(200)
    } catch (error) {
      expect(error.response.status).to.be.equal(422)
      expect(error.response.data.message).to.be.equal(
        'the request needs 4 fields : email, password'
      )
    }
  })

  it('should return an error if the password is wrong', async () => {
    try {
      const credentials: UserCredentialsInterface = {
        email: new_user_info.email,
        password: 'wrongpassword',
      }

      const response: AxiosResponse = await axios.post(
        `${API_URL}/auth/signin`,
        credentials
      )
      expect(response.status).not.to.be.equal(200)
    } catch (error) {
      expect(error.response.status).to.be.equal(403)
      expect(error.response.data.message).to.be.equal('wrong email or password')
    }
  })

  it('should return an error if the email is wrong', async () => {
    try {
      const credentials: UserCredentialsInterface = {
        email: 'wrong email',
        password: new_user_info.password,
      }

      const response: AxiosResponse = await axios.post(
        `${API_URL}/auth/signin`,
        credentials
      )
      expect(response.status).not.to.be.equal(200)
    } catch (error) {
      expect(error.response.status).to.be.equal(403)
      expect(error.response.data.message).to.be.equal('wrong email or password')
    }
  })

  it('should get the token if the credentials are correct', async () => {
    const credentials: UserCredentialsInterface = {
      email: new_user_info.email,
      password: new_user_info.password,
    }

    const response: AxiosResponse = await axios.post(
      `${API_URL}/auth/signin`,
      credentials
    )

    const foundUser = await User.findOne({ email: new_user_info.email })
    expect(response.status).to.be.equal(200)
    expect(response.data.token).to.be.an('string')
    expect(response.data.userId).to.be.an('string')
    expect(response.data).to.have.all.keys('userId', 'token')
    expect(response.data.userId).to.be.equal(foundUser._id.toString())
  })
})

let headers
let responseSI: AxiosResponse|undefined
let data:SigninResponseInterface|undefined

describe('/auth/verify Route : ', () => {
  beforeEach(async () => {
    const credentials: UserCredentialsInterface = {
      email: new_user_info.email,
      password: new_user_info.password,
    }
    responseSI = await axios.post(
      `${API_URL}/auth/signin`,
      credentials
    )
    data = responseSI.data
    headers= {
      Authorization:`Bearer ${data.token}`
    }
  })

  it('should return an error if there is no token', async () => {
    try {
      await axios.get(`${API_URL}/auth/verify`)
    } catch (error) {
      expect(error.response.status).to.be.equal(422)
      expect(error.response.data).to.be.an('object')
      expect(error.response.data).to.have.all.keys('message')
      expect(error.response.data.message).to.be.equal('cannot get the token')
    }
  })

  it('should return the user Id', async () => {    
      const response: AxiosResponse = await axios.get(
        `${API_URL}/auth/verify`,
        {headers}
      )
      console.log('delete : should return the user id !: ', response.status, response.data)
      expect(response.data).to.be.an('object')
      expect(response.data.id).to.be.equal(data.userId)
  })

  after(async () => {
    await User.findOneAndDelete({ email: new_user_info.email })
  })
})

