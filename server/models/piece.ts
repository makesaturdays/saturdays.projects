
import { Request } from 'express'

import Model, { Filters, Endpoints } from './_model'

export default class Piece extends Model {
  static collection = 'pieces'
  static properties = {
    content: {
      type: 'object'
    }
  }

  static pieces(filters: Filters): Promise<{[route: string]: any}> {
    return super.list(filters).then(pieces => pieces.reduce((values: {[route: string]: any}, piece: any)=> {
      values[piece.route] = {
        ...piece.content,
        _id: piece._id
      }
      return values
    }, {}))
  }

  static endpoints(): Endpoints {
    return {
      [`/${this.collection}`]: {
        'GET': {
          function: (req: Request): Promise<{[route: string]: any}> => this.pieces({})
        }
      }
    }
  }
}