import { AxiosTokenHeader } from "../@types/axios.type"

const tokenHeader = (token:string): AxiosTokenHeader =>{
    return {
        headers:{
            Authorization: `Bearer ${token}`
        }
    }
}

export {
    tokenHeader
}