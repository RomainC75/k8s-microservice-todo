import express, { Express, Request, Response, NextFunction } from "express"
var router = express.Router();

router.use((req:Request,res:Response,next:NextFunction)=>{
    const fields = ["firstname", "lastname", "email", "password"]
    const {body} = req
    console.log('BODY : ', body)
    const isEachFieldInBody = fields.every((field) => field in body)
        if (!isEachFieldInBody) {
            return res
                .status(422)
                .json({
                    message:
                        "the request needs 4 fields : firstname, lastname, email, password",
                })
        }
        const isEachFieldAString = fields.every(field=> typeof body[field]==="string")
        if (!isEachFieldAString) {
            return res
                .status(422)
                .json({
                    message:
                        "each field should be a string",
                })
        }
    next()
})

module.exports = router