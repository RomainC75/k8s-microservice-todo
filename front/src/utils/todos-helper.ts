import axios from "axios"

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

export const getTodosFromList = async (listId:string): Promise<any> =>{

    const token:string|null = localStorage.getItem('authToken')
    if(!token){
        return null
    }

    return await axios({
        url: `${API_URL}/todo/task/${listId}`,
        headers:{
            Authorization: `Bearer ${token}`
        }
    }).then ((response) =>{
        console.log('==> getLists',response)
        return {
            status: response.status,
            data: response.data
        }
    }).catch((error) =>{
        console.log("ERROR getLists",error)
        return {
            status: error.status,
            data: error.response
        }
    })
}