import { Request, Response, NextFunction } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { AuthenticatedRequest } from '../@types/authenticatedRequest'
import AuthService from '../services/auth.service'
import { postSigninMessages, postSignupMessages, verifyMessage } from '../messages/auth.message'
import { IdTokenData } from '../@types/messageStatus'

export const postSignup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authService = new AuthService()
    
    if (await authService.isEmailInDb(req.body.email)) {
      return res.status(postSignupMessages[0].status).json({ message: postSignupMessages[0].message })
    }
    await authService.signup(req.body)
    res.status(postSignupMessages[1].status).json({ message: postSignupMessages[1].message })
  } catch (error) {
    next(error)
  }
}

export const postSignin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authService = new AuthService()
    const foundUser = await authService.getUserByEmail(req.body.email)
    if (!foundUser) {
      return res.status(postSigninMessages[0].status).json({ message: postSigninMessages[0].message })
    }

    const isPasswordValid: boolean = await bcrypt.compare(
      req.body.password,
      foundUser.password
    )
    
    if (!isPasswordValid) {
      return res.status(postSigninMessages[0].status).json({ message: postSigninMessages[0].message })
    }

    const data: IdTokenData = {
      userId: foundUser._id.toString(),
      token: jwt.sign(
        { userId: foundUser._id.toString(), email: foundUser.email },
        process.env.TOKEN_SECRET,
        {
          expiresIn: '10h',
        }
      ),
    }
    
    res.status(postSigninMessages[1].status).json(postSigninMessages[1].data(data))    
  } catch (error) {
    next(error)
  }
}

export const verify = async (req: AuthenticatedRequest, res: Response) => {
  if (req.user) {
    res.status(verifyMessage[0].status).json(verifyMessage[0].user(req.user))
  }
}

