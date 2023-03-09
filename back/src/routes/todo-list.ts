import express from 'express';
var router = express.Router();

import { createList, deleteList, getAllLists, putList } from '../controllers/list.controller';

router.get('/',getAllLists)
router.post('/', createList)
router.put('/:listId', putList)
router.delete('/:listId', deleteList)

module.exports = router