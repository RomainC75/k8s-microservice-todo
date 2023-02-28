import { assert } from 'chai'
import { API_URL, new_user_info } from './utils/utils'
const axios = require('axios')
const expect = require('chai').expect
// const { before, after, afterAll, describe, it } = require('mocha')
import { describe, it, after } from 'mocha'
let chai = require('chai')
let should = chai.should()

require('../db')
const User = require('../models/user.model')

describe('/user Route : ', () => {
  it('should return "user created"', async () => {
    try {
      const response = await axios.post(`${API_URL}/user/signup`, new_user_info)
      expect(response.status).to.be.equal(201)

      const { data } = response
      console.log(data)
    } catch (error) {
      expect(error.response.status).to.be.equal(201)
      console.log('+++++++++++++++===', error.response.status)
    }
  })

  it('should return "user already exists"', async () => {
    try {
      const response = await axios.post(`${API_URL}/user/signup`, new_user_info)
      expect(response.status).not.to.be.equal(201)

      const { data } = response
    } catch (error) {
      expect(error.response.status).to.be.equal(409)
    }
  })
  after(async () => {
    await User.findOneAndDelete({ email: new_user_info.email })
  })
})
