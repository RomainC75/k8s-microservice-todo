import express from 'express';
var router = express.Router();
import { getAllTodos, createTodo, putTodo, deleteTodo } from '../controllers/todo.controller';

router.get('/:listId',getAllTodos)
router.post('/:listId', createTodo)
router.put('/:todoId',  putTodo)
router.delete('/:todoId',  deleteTodo)

module.exports = router