
export interface NewTodoInterface {
  name: string
  description?: string
  deadLine: string
  isDone: boolean
}

export interface TodoInterface extends NewTodoInterface {
  id: string
  listId: string
  createdAt: string
  updatedAt: string
  __v: number
}
