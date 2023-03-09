import express from 'express';
var router = express.Router();
const authentication = require('../middlewares/authentication')

router.use('/list',authentication, require('./todo-list'))
router.use('/task', authentication, require('./todo-task'))

module.exports = router