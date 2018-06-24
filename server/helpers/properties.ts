
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