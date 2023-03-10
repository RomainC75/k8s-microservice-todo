import {AxiosResponse} from 'axios'

interface AxiosParamsInterface {
    method?: string
    url: string
  }

interface AxiosTokenHeader {
    headers:{
        Authorization: string
    }
}

  type AxiosServiceResponse = {
    data:Pick<AxiosResponse,"data">
    status:number
}


  
  export {
    AxiosParamsInterface,
    AxiosServiceResponse,
    AxiosTokenHeader
  }
  