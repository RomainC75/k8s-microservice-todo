import express from 'express';
var router = express.Router();
import {postSignup, postSignin, verify} from '../controllers/auth.controller'
import { createList, deleteList, getAllLists, putList } from '../controllers/list.controller';
const authentication = require('../middlewares/authentication')

router.get('/list',authentication,getAllLists)
router.delete('/list/:id', authentication, deleteList)
router.put('/list/:id', authentication, putList)
router.post('/list',authentication, createList)
module.exports = router