import express from 'express';
var router = express.Router();
const authentication = require('../middlewares/authentication')

import { createList, deleteList, getAllLists, putList } from '../controllers/list.controller';
import { getAllTodos, createTodo, putTodo, deleteTodo } from '../controllers/todo.controller';

router.get('/list',authentication,getAllLists)
router.post('/list',authentication, createList)
router.put('/list/:listId', authentication, putList)
router.delete('/list/:listId', authentication, deleteList)

router.get('/task/:listId',authentication,getAllTodos)
router.post('/task/:listId',authentication, createTodo)
router.put('/task/:todoId', authentication, putTodo)
router.delete('/task/:todoId', authentication, deleteTodo)

module.exports = router