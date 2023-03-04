import axios from "axios"
import { NewTodoInterface, TodoInterface } from "../@types/todo.type";

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

export const createTodo = async (listId:string, newTodo:NewTodoInterface): Promise<any> =>{

    const token:string|null = localStorage.getItem('authToken')
    if(!token){
        return null
    }
    console.log('todo to send :  : ', newTodo)
    return await axios({
        method:"post",
        url: `${API_URL}/todo/task/${listId}`,
        headers:{
            Authorization: `Bearer ${token}`
        },
        data:newTodo
    }).then ((response) =>{
        console.log('==> createTodo',response)
        return {
            status: response.status,
            data: response.data
        }
    }).catch((error) =>{
        console.log("ERROR createTodo",error)
        return {
            status: error.status,
            data: error.response
        }
    })
}


export const putTodo = async (listId:string, newTodo:NewTodoInterface): Promise<any> =>{

    const token:string|null = localStorage.getItem('authToken')
    if(!token){
        return null
    }
    console.log('todo to send :  : ', newTodo)
    return await axios({
        method:"put",
        url: `${API_URL}/todo/task/${listId}`,
        headers:{
            Authorization: `Bearer ${token}`
        },
        data:newTodo
    }).then ((response) =>{
        console.log('==> putTodo',response)
        return {
            status: response.status,
            data: response.data
        }
    }).catch((error) =>{
        console.log("ERROR putTodo",error)
        return {
            status: error.status,
            data: error.response
        }
    })
}

export const isNameAlreadyUsedFn = (todos: TodoInterface[], name:string):boolean =>{
    return todos.some(todo=>todo.name===name)
}