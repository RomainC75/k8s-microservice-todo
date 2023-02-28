import express from 'express';
var router = express.Router();
import {postSignup, postSignin, verify} from '../controllers/auth.controller'


module.exports = router