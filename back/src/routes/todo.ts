import express from 'express';
import authentication from '../middlewares/authentication'

import todoListRouter from './todo-list'
import todoTastRouter from './todo-task'

const router = express.Router();

router.use('/list',authentication, todoListRouter)
router.use('/task', authentication, todoTastRouter)

export default router