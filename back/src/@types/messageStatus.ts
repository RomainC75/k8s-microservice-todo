interface MessageStatusInterface {
  status: number
  message: string
}

interface IdTokenMessage {
  status: number
  data: IdTokenData
}

interface IdTokenData {
  userId: string
  token: string
}

export { MessageStatusInterface, IdTokenData, IdTokenMessage }

