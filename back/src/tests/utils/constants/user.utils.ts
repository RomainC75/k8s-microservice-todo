import { UserInterface } from "../../../@types/userInterface"

const new_user_info:UserInterface = {
  firstname: 'Dummy',
  lastname: 'User',
  email: 'dummy.user@gmail.com',
  password: 'azerty123',
}

const new_user_info2:UserInterface = {
  firstname: 'Dummy2',
  lastname: 'User2',
  email: 'dummy2.user@gmail.com',
  password: 'azerty123',
}

const new_users:UserInterface[]=[
  new_user_info,
  new_user_info2
]

export {
  new_user_info,
  new_user_info2,
  new_users
}