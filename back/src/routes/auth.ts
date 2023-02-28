import express from 'express';
var router = express.Router();
import {postSignup, postSignin} from '../controllers/user.controller'
const checkSignupFields = require('../middlewares/checkSignupFields')
const checkSigninFields = require('../middlewares/checkSigninFields')

/* GET users listing. */
router.post('/signup', checkSignupFields , postSignup);
router.post('/signin', checkSigninFields, postSignin)



module.exports = router;

