import { ObjectId } from 'mongodb'

export const ARRAY = (items: any) => ({
  type: 'array',
  items
})

export const OPTIONAL = (property: any) => ({
  ...property,
  required: false
})

export const ONEOF = (property: any, list: any[])=> ({
  ...property,
  enum: list
})

export const EMAIL = {
  type: 'string',
  pattern: /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
  maximum: 1000,
  required: true,
  message: 'is not a valid email address'
}

export const PASSWORD = {
  type: 'string',
  minimum: 8,
  maximum: 1000,
  required: true
}

export const TEXT = {
  type: 'string',
  maximum: 10000,
  required: true
}

export const INT = (minimum? : number, maximum? : number)=> ({
  type: 'integer',
  minimum,
  maximum,
  required: true,
  sanitize: (value: any)=> parseInt(value)
})

export const FLOAT = (minimum? : number, maximum? : number)=> ({
  type: 'number',
  minimum,
  maximum,
  required: true,
  sanitize: (value: any)=> parseFloat(value)
})

export const OBJECT_ID = {
  type: 'string',
  maximum: 10000,
  required: true,
  sanitize: (value: any)=> new ObjectId(value)
}

export const DATE = {
  type: 'date',
  required: true,
  sanitize: (value: any)=> new Date(value)
}

export const ADDRESS = {
  type: 'object',
  required: true,
  properties: {
    first_name: TEXT,
    last_name: TEXT,
    address_1: TEXT,
    address_2: OPTIONAL(TEXT),
    city: TEXT,
    country: TEXT,
    state: TEXT,
    postal_code: TEXT,
    note: OPTIONAL(TEXT)
  }
}

export const PAYMENT_METHOD = {
  type: 'object',
  required: true,
  properties: {
    token: TEXT
  }
}