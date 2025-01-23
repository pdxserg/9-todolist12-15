export type Respond<T = {}> = {
  data: T
  fieldsErrors: FieldError[]
  messages: string[]
  resultCode: number
}
export type FieldError = {
  error: string
  field: string
}
