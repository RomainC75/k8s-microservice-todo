import axios from 'axios'

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";



export const getLists = async (): Promise<any> =>{
    const token:string|null = localStorage.getItem('authToken')
    if(!token){
        return null
    }
    return await axios({
        url: `${API_URL}/todo/list`,
        headers:{
            Authorization: `Bearer ${token}`
        }
    }).then ( (response) => {
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

export const createList = async (name:string): Promise<any> =>{
    const token:string|null = localStorage.getItem('authToken')
    if(!token){
        return null
    }
    return await axios({
        method:"post",
        url: `${API_URL}/todo/list`,
        headers:{
            Authorization: `Bearer ${token}`
        },
        data:{
            name
        }
    }).then ( (response) => {
        console.log('==> postList',response)
        return {
            status: response.status,
            data: response.data
        }
    }).catch((error) =>{
        console.log("ERROR postList",error)
        return {
            status: error.status,
            data: error.response
        }
    })
}

export const deleteList = async (id:string): Promise<any> =>{
    const token:string|null = localStorage.getItem('authToken')
    if(!token){
        return null
    }
    return await axios({
        method:"delete",
        url: `${API_URL}/todo/list/${id}`,
        headers:{
            Authorization: `Bearer ${token}`
        }
    }).then ( (response) => {
        console.log('==> deleteList',response)
        return {
            status: response.status,
            data: response.data
        }
    }).catch((error) =>{
        console.log("ERROR deleteList",error)
        return {
            status: error.status,
            data: error.response
        }
    })
}


// export const getAPIsdf = async (url: string, data: any): Promise<any> =>{
//     return await axios({
//         ...getConfig,
//         url: `${getConfig.baseUrl}/${url}/${data}`,
//     }).then ( (response) => {
//         console.log(response)
//         return {
//             status: response.status,
//             data: response.data
//         }
//     }).catch((error) =>{
//         console.log(error)
//         return {
//             status: error.status,
//             data: error.response
//         }
//     })
// }