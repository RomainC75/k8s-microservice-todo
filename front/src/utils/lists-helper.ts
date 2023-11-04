import axios, { AxiosResponse } from 'axios'
import { AxiosParamsInterface } from '../@types/axios.type'

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000'

export const getLists = async (): Promise<any> => {
  return axiosBase(
    {
      url: `${API_URL}/todo/list`,
    },
    true
  )
}

export const createList = async (name: string): Promise<any> => {
  return axiosBase(
    {
      url: `${API_URL}/todo/list`,
      method: 'POST',
    },
    true,
    { name }
  )
}

export const deleteList = async (id: string): Promise<any> => {
  return axiosBase(
    {
      url: `${API_URL}/todo/list/${id}`,
      method: 'DELETE',
    },
    true
  )
}

const axiosBase = (
  requestParams: AxiosParamsInterface,
  isToken: boolean,
  data?: any
) => {
  return new Promise(async (resolve, reject) => {
    try {
      const token: string | null = localStorage.getItem('authToken')
      if (!token) {
        reject(null)
      }
      const response: AxiosResponse = await axios({
        ...requestParams,
        headers: isToken
          ? {
              Authorization: `Bearer ${token}`,
            }
          : {},
        data,
      })
      resolve({
        status: response.status,
        data: response.data,
      })
    } catch (error: any) {
      console.log('ERROR deleteList', error)
      reject({
        status: error.status,
        data: error.response,
      })
    }
  })
}

// export const getLists = async (): Promise<any> => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       const token: string | null = localStorage.getItem("authToken");
//       if (!token) {
//         reject(null);
//       }
//       const response: AxiosResponse = await axios({
//         url: `${API_URL}/todo/list`,
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       console.log("==> getLists", response);
//       resolve({
//         status: response.status,
//         data: response.data,
//       });
//     } catch (error: any) {
//       console.log("ERROR getLists", error);
//       reject({
//         status: error.status,
//         data: error.response,
//       });
//     }
//   });
// };

// export const createList = async (name: string): Promise<any> => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       const token: string | null = localStorage.getItem("authToken");
//       if (!token) {
//         reject(null);
//       }
//       const response: AxiosResponse = await axios({
//         method: "post",
//         url: `${API_URL}/todo/list`,
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//         data: {
//           name,
//         },
//       });
//       console.log("==> postList", response);
//       resolve({
//         status: response.status,
//         data: response.data,
//       });
//     } catch (error: any) {
//       console.log("ERROR postList", error);
//       reject({
//         status: error.status,
//         data: error.response,
//       });
//     }
//   });
// };

// export const deleteList = async (id: string): Promise<any> => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       const token: string | null = localStorage.getItem("authToken");
//       if (!token) {
//         reject(null);
//       }
//       const response: AxiosResponse = await axios({
//         method: "delete",
//         url: `${API_URL}/todo/list/${id}`,
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       resolve({
//         status: response.status,
//         data: response.data,
//       });
//     } catch (error: any) {
//       console.log("ERROR deleteList", error);
//       reject({
//         status: error.status,
//         data: error.response,
//       });
//     }
//   });
// };
