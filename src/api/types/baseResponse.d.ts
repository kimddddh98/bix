export {}

declare global {
  interface BaseResponse<T> {
    content: T
  }

  interface PagenationResponse<T> extends BaseResponse<T> {
    last: boolean
    number: number
    size: number
    totalPages: number
  }
}
