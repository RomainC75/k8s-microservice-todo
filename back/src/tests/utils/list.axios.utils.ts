import { AxiosServiceResponse } from '../@types/axios.type'
import axiosBase from './base.axios.utils'

import { API_URL } from './constants'

export const getLists = async (token:string): Promise<AxiosServiceResponse> => {
  return axiosBase(
    {
      url: `${API_URL}/todo/list`,
    },
    token
  )
}

export const createList = async (name: string, token:string): Promise<AxiosServiceResponse> => {
  return axiosBase(
    {
      url: `${API_URL}/todo/list`,
      method: 'POST',
    },
    token,
    { name }
  )
}


export const deleteList = async (id: string, token:string): Promise<AxiosServiceResponse> => {
  return axiosBase(
    {
      url: `${API_URL}/todo/list/${id}`,
      method: 'DELETE',
    },
    token
  )
}

