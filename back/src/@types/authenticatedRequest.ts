import {Request} from 'express'

interface AuthenticatedRequest extends Request{
    user?:{
        id:string,
        email:string
    }
}

export {AuthenticatedRequest}