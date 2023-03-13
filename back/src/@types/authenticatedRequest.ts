import { Request } from 'express'

interface AuthenticatedUser {
  id: string,
  email: string
}

interface AuthenticatedRequest extends Request {
  user?: AuthenticatedUser
}

export { AuthenticatedRequest, AuthenticatedUser }
