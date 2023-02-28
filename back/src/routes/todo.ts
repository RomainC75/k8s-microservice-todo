import express from 'express';
var router = express.Router();
import {postSignup, postSignin, verify} from '../controllers/auth.controller'
import { createList, deleteList, getAllLists, putList } from '../controllers/list.controller';
const authentication = require('../middlewares/authentication')

router.get('/list',authentication,getAllLists)
router.post('/list',authentication, createList)
router.put('/list/:listId', authentication, putList)
router.delete('/list/:listId', authentication, deleteList)

module.exports = router