
import { hashPassword } from '../helpers/encryption'
import { ObjectId } from 'mongodb'

import Model, { Id } from './_model'
import { EMAIL, PASSWORD } from '../helpers/properties'


export default class User extends Model {
  static collection = 'users'
  static properties = {
    email: EMAIL,
    password: PASSWORD
  }

  static preprocess(data: any) {
    return super.preprocess({
      ...data,
      ...(data.password
      ? hashPassword(data.password)
      : {})
    })
  }

  static get(_id: Id) {
    return super.get(_id).then(user => {
      delete user.password
      delete user.salt
      return user
    })
  }
}