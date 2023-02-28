require('dotenv').config()

export const API_URL = `${process.env.DOMAIN}:${process.env.PORT}`

export const new_user_info = {
  firstname: 'Dummy',
  lastname: 'User',
  email: 'dummy.user@gmail.com',
  password: 'azerty123',
}
