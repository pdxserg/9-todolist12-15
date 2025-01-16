export type Respond<T = {}> = {
  data: T
  fieldsErrors: FieldError[]
  messages: []
  resultCode: number
}
export type FieldError = {
  error: string
  field: string
}
