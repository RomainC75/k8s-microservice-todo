import express, { Response, NextFunction } from "express"
const router = express.Router();
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()
import { AuthenticatedRequest } from "../@types/authenticatedRequest";

router.use((req:AuthenticatedRequest,res:Response,next:NextFunction)=>{
    try {
        if(!req.headers.authorization){
            return res.status(422).json({message:"cannot get the token"})
        }
        const token:string|undefined = req.headers.authorization.split(' ')[1]
        console.log('==> token', token)
        if(!token){
            return res.status(422).json({message:"cannot get the token"})
        }
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
        console.log('===> decodedtoken : ', decoded)
        req.user={
            id:decoded.userId,
            email:decoded.email
        }
        next()
    } catch (error) {
        
        next(error)
    }
})

export default router