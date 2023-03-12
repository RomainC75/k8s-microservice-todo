import { Request, Response, NextFunction } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { AuthenticatedRequest } from '../@types/authenticatedRequest'
import AuthService from '../services/auth.service'

export const postSignup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authService = new AuthService()
    
    if (await authService.isEmailInDb(req.body.email)) {
      return res.status(409).json({ message: 'user already exists' })
    }
    await authService.signup(req.body)
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
  try {
    const authService = new AuthService()
    const foundUser = await authService.getUserByEmail(req.body.email)
    if (!foundUser) {
      return res.status(403).json({ message: 'wrong email or password' })
    }

    const isPasswordValid: boolean = await bcrypt.compare(
      req.body.password,
      foundUser.password
    )
    
    if (!isPasswordValid) {
      return res.status(403).json({ message: 'wrong email or password' })
    }

    res.status(200).json({
      userId: foundUser._id,
      token: jwt.sign(
        { userId: foundUser._id.toString(), email: foundUser.email },
        process.env.TOKEN_SECRET,
        {
          expiresIn: '10h',
        }
      ),
    })
  } catch (error) {
    next(error)
  }
}

export const verify = async (req: AuthenticatedRequest, res: Response) => {
  if (req.user) {
    res.status(200).json(req.user)
  }
}
