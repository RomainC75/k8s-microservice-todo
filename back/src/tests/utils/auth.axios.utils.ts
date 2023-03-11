import { AxiosServiceResponse } from '../@types/axios.type'
import axiosBase from './base.axios.utils'

import { API_URL } from './constants/api.utils'

export const signin = async (email:string, password:string): Promise<AxiosServiceResponse> => {
  return axiosBase(
    {
      url: `${API_URL}/auth/signin`,
      method:"POST"
    },
    null,
    {
        email, password
    }
  )
}
