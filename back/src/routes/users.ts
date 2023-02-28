import express from 'express';
var router = express.Router();
import {postSignup} from '../controllers/user.controller'

/* GET users listing. */
router.post('/signup', postSignup);


module.exports = router;

