import { AuthenticatedUser } from '../@types/authenticatedRequest'
import { IdTokenData, MessageStatusInterface } from '../@types/messageStatus'

const postSignupMessages: MessageStatusInterface[] = [
  { status: 409, message: 'user already exists' },
  { status: 201, message: 'user created' },
]

const postSigninMessages = [
  { status: 403, message: 'wrong email or password' },
  { status: 200, data: (data: IdTokenData) => data },
]

const verifyMessage = [{ status: 200, user: (user: AuthenticatedUser) => user }]

export { postSignupMessages, postSigninMessages, verifyMessage }
