import axios, { AxiosError, AxiosResponse } from "axios";
import { NewTodoInterface, TodoInterface } from "../@types/todo.type";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

export const getTodosFromList = async (listId: string): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      const token: string | null = localStorage.getItem("authToken");
      if (!token) {
        reject(null);
      }
      const response: AxiosResponse = await axios({
        url: `${API_URL}/todo/task/${listId}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("==> getLists", response);
      resolve({
        status: response.status,
        data: response.data,
      });
    } catch (error: any) {
      console.log("ERROR getLists", error);
      reject({
        status: error.status,
        data: error.response,
      });
    }
  });
};

export const createTodo = async (
  listId: string,
  newTodo: NewTodoInterface
): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      const token: string | null = localStorage.getItem("authToken");
      if (!token) {
        reject(null);
      }
      console.log("todo to send :  : ", newTodo);
      const response: AxiosResponse = await axios({
        method: "post",
        url: `${API_URL}/todo/task/${listId}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: newTodo,
      });
      console.log("RESPONSE : ", response);
      resolve({
        status: response.status,
        data: response.data,
      });
    } catch (error: any) {
      console.log("ERROR createTodo", error);
      reject({
        status: error.status,
        data: error.response,
      });
    }
  });
};

export const putTodo = async (
  listId: string,
  newTodo: NewTodoInterface
): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      const token: string | null = localStorage.getItem("authToken");
      if (!token) {
        reject(null);
      }
      console.log("todo to send :  : ", newTodo);
      const response: AxiosResponse = await axios({
        method: "put",
        url: `${API_URL}/todo/task/${listId}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: newTodo,
      });

      console.log("==> putTodo", response);
      resolve({
        status: response.status,
        data: response.data,
      });
    } catch (error: any) {
      console.log("ERROR putTodo", error);
      reject({
        status: error.status,
        data: error.response,
      });
    }
  });
};

export const deleteTodo = async (todoId: string): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    const token: string | null = localStorage.getItem("authToken");
    if (!token) {
      reject(null);
    }
    try {
      const response: AxiosResponse = await axios({
        method: "delete",
        url: `${API_URL}/todo/task/${todoId}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      resolve({
        status: response.status,
        data: response.data,
      });
    } catch (error: any) {
      console.log("ERROR putTodo", error);
      reject({
        status: error.status,
        data: error.response,
      });
    }
  });
};

export const isNameAlreadyUsedFn = (
  todos: TodoInterface[],
  name: string
): boolean => {
  return todos.some((todo) => todo.name === name);
};

export const countTodosRegardingTheState = (
  todos: TodoInterface[],
  isDone: boolean
) => {
  return todos.filter((todo) => todo.isDone === isDone).length;
};
