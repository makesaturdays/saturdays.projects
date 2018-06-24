import { Request } from 'express'
import { ObjectID } from 'mongodb'

import { randomPassword, hashPassword } from '../helpers/encryption'
import { ResponseError } from '../helpers/errors'
import { EMAIL, PASSWORD } from '../helpers/properties'

import Model from './_model'
import User from './user'

export default class Session extends Model {
  static collection = 'sessions'
  static properties = {
    email: EMAIL,
    password: PASSWORD
  }

  static endpoints(): {
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    endpoint: string,
    function: (req: Request) => Promise<any> | Promise<any[]> | Promise<{ _id: ObjectID }> | Promise<{ deleted: number }>
  }[] {
    return [
      {
        method: 'POST',
        endpoint: `/${this.collection}`,
        function: (req: Request) : Promise<any> => this.create(this.validate(req.body))
      },
      {
        method: 'GET',
        endpoint: `/${this.collection}/:id`,
        function: (req: Request) : Promise<any> => this.get(req.params.id)
      },
      {
        method: 'DELETE',
        endpoint: `/${this.collection}/:id`,
        function: (req: Request) : Promise<{ deleted: number }> => this.destroy(req.params.id)
      }
    ]
  }

  static create(data) {
    return User.get_where({email: data.email}).then(user => {
      if (user && user.password === hashPassword(data.password, user.salt).password) {
        const secret = randomPassword()
        const hash = hashPassword(secret)

        return super.create({
          secret_hash_salt: hash.salt,
          secret_hash: hash.password,
          user_id: user._id
        }).then(session => ({
          _id: session._id,
          secret: secret,
          user_id: user._id
        }))
      } else {
        throw new ResponseError('this email password combination cannot be found', 403)
      }
      
    })

  }
}