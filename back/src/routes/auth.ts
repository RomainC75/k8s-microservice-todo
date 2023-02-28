import express from 'express';
var router = express.Router();
import {postSignup, postSignin, verify} from '../controllers/auth.controller'
const checkSignupFields = require('../middlewares/checkSignupFields')
const checkSigninFields = require('../middlewares/checkSigninFields')
const authentication = require('../middlewares/authentication')

/* GET users listing. */
router.post('/signup', checkSignupFields , postSignup);
router.post('/signin', checkSigninFields, postSignin);
router.get('/verify', authentication, verify)


module.exports = router;