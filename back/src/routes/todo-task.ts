import express from 'express'
const router = express.Router()
import {
  getAllTodos,
  createTodo,
  putTodo,
  deleteTodo,
} from '../controllers/todo.controller'

router.get('/:listId', getAllTodos)
router.post('/:listId', createTodo)
router.put('/:todoId', putTodo)
router.delete('/:todoId', deleteTodo)

export default router
