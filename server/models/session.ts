import { Request, Response } from 'express'
import { ObjectID } from 'mongodb'

import { randomPassword, hashPassword } from '../helpers/encryption'
import { ResponseError } from '../helpers/errors'
import { EMAIL, PASSWORD } from '../helpers/properties'

import Model, { Endpoints } from './_model'
import User from './user'
import { addSession } from '../middlewares/authenticate'


export default class Session extends Model {
  static collection = 'sessions'
  static properties = {
    email: EMAIL,
    password: PASSWORD
  }

  static create(data: any) {
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

  static endpoints() : Endpoints {
    return {
      [`/${this.collection}`]: {
        'POST': {
          function: (req: Request, res: Response) : Promise<any> => this.create(this.validate(req.body)).then(session => {
            res.cookie('Session-Id', session._id, {signed: true})
            res.cookie('Session-Secret', session.secret, {signed: true})
            return session
          })
        }
      },
      [`/${this.collection}/mine`]: {
        'GET': {
          function: (req: Request) : Promise<any> => Promise.resolve(req.session),
          middlewares: [addSession]
        },
        'DELETE': {
          function: (req: Request, res: Response) : Promise<{ deleted: number }> => this.destroy(req.session._id).then(response => {
            res.clearCookie('Session-Id')
            res.clearCookie('Session-Secret')
            return response
          }),
          middlewares: [addSession]
        }
      }
    }
  }
}