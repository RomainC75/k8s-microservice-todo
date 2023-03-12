import express, { Request, Response, NextFunction } from 'express'
const router = express.Router()

router.use((req: Request, res: Response, next: NextFunction) => {
  const fields = ['email', 'password']
  const { body } = req

  const isEachFieldInBody = fields.every((field) => field in body)
  if (!isEachFieldInBody) {
    return res.status(422).json({
      message: 'the request needs 4 fields : email, password',
    })
  }
  const isEachFieldAString = fields.every(
    (field) => typeof body[field] === 'string'
  )
  if (!isEachFieldAString) {
    return res.status(422).json({
      message: 'each field should be a string',
    })
  }
  next()
})

export default router
