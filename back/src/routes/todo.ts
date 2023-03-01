import express from 'express';
var router = express.Router();
const authentication = require('../middlewares/authentication')
import { getAllTodos, deleteTodo, createTodo, putTodo } from '../controllers/todo.controller';


router.get('/task/:listId',authentication, getAllTodos)
router.post('/task/:listId',authentication, createTodo)
router.put('/task/:todoId', authentication, putTodo)
router.delete('/task/:todoId', authentication, deleteTodo)

module.exports = router