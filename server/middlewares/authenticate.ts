
import { Request, Response, NextFunction } from 'express'
import { ObjectId } from 'mongodb'

import Session from '../models/session'

import { hashPassword } from '../helpers/encryption'
import { sendError, ResponseError } from '../helpers/errors'

declare module 'express' {
  interface Request {
    session: {
      _id: ObjectId,
      user_id: ObjectId,
      secret_hash: string,
      secret_hash_salt: string
    }
  }
}

export const addSession = async (req: Request, res: Response, next: NextFunction) => {
  
  if (req.signedCookies['Session-Id']) {
    req.session = await Session.get(req.signedCookies['Session-Id'])
    if (!req.session || req.session.secret_hash !== hashPassword(req.signedCookies['Session-Secret'], req.session.secret_hash_salt).password) {
      return sendError(res, new ResponseError('this session is invalid', 403))
    }
  } else {
    return sendError(res, new ResponseError('requires a session', 403))
  }

  next()
}