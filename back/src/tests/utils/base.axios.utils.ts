import axios, { AxiosResponse } from 'axios'
import { AxiosParamsInterface, AxiosServiceResponse } from '../@types/axios.type'


const axiosBase = (
    requestParams: AxiosParamsInterface,
    token:string | null,
    data?: any
  ):Promise<AxiosServiceResponse> => {
    return new Promise(async (resolve, reject) => {
      try {
        
        const response: AxiosResponse = await axios({
          ...requestParams,
          headers: token
            ? {
                Authorization: token && `Bearer ${token}`,
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

export default axiosBase