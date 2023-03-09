import express, { Express, Request, Response, NextFunction } from 'express'
const User = require('../models/user.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
import { AuthenticatedRequest } from "../@types/authenticatedRequest";
import {isEveryStringKeyPresentFn} from '../utils/isEveryStringKeysPresent';


export const postSignup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { body } = req

    const foundUser = await User.findOne({ email: body.email })
    if (foundUser) {
      return res.status(409).json({ message: 'user already exists' })
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(body.password, salt)
    const ans = await User.create({
      ...body,
      password: hash,
    })

    res.status(201).json({ message: 'user created' })
  } catch (error) {
    next(error)
  }
}

export const postSignin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { body } = req
  console.log('signin:', body)
  try {
    const foundUser = await User.findOne({ email: body.email })
    if (!foundUser) {
      return res.status(403).json({ message: 'wrong email or password' })
    }

    const isPasswordValid:boolean = await bcrypt.compare(
      body.password,
      foundUser.password
    )
    console.log('VERIFICATRION : ', foundUser.password, body.password)
    if (!isPasswordValid) {
      return res.status(403).json({ message: 'wrong email or password' })
    }

    res.status(200).json({
      userId: foundUser._id,
      token: jwt.sign({ userId: foundUser._id.toString(), email:foundUser.email }, process.env.TOKEN_SECRET, {
        expiresIn: '10h',
      }),
    })
  } catch (error) {
    console.log(error)
    next(error)
  }
}



export const verify = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  if(req.user){
    res.status(200).json(req.user)
  }
  
}
