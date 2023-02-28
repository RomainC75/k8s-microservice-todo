import express, { Express, Request, Response, NextFunction } from "express"
const User = require("../models/user.model")

export const postSignup = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { body } = req
        const fields = ["firstname", "lastname", "email", "password"]
        const isEachFieldInBody = fields.every((field) => field in body)
        if (!isEachFieldInBody) {
            return res
                .status(422)
                .json({
                    message:
                        "the request needs 4 fields : firstname, lastname, email, password",
                })
        }

        const foundUser = await User.findOne({ email: body.email })
        
        if (foundUser) {
            return res.status(409).json({ message: "user already exists" })
        }

        const ans = await User.create(req.body)
        console.log("req.body", req.body)
        res.status(201).json({ message: "/signup" })
    } catch (error) {
        console.log("=>", error)
        next(error)
        
    }
}
