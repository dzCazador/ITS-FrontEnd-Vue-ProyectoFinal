// APIService interface. This interface is used by the default implementation of the APIService class.
export interface APIResponse<T> {
  status: number
  statusText: string
  data: T // <-- generic type of response
}

// AuthAPIService interface. This interface is used by the default implementation of the AuthAPIService class.
export interface AuthApiResponseModel {
  statusCode?: number // 400: Bad Request, 200: OK, 401: Unauthorized, 500: Internal Server Error, 201: Created
  message?: string | [string] // dependiendo la respuesta nos puede llegar un string solitario o una lista
  error?: string
}
