import express from 'express';
const router = express.Router();
import {postSignup, postSignin, verify} from '../controllers/auth.controller'
import checkSignupFields from '../middlewares/checkSignupFields'
import checkSigninFields from '../middlewares/checkSigninFields'
import authentication from '../middlewares/authentication'

/* GET users listing. */
router.post('/signup', checkSignupFields , postSignup);
router.post('/signin', checkSigninFields, postSignin);
router.get('/verify', authentication, verify)


export default router