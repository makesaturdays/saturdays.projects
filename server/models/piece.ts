
import { ObjectId } from 'mongodb'

import Model from './_model'

export default class Piece extends Model {
  static collection = 'pieces'


  static list(filters, limit=50, page=0, sort?) {
    return super.list(filters).then(pieces => pieces.reduce((values, piece)=> {
      values[piece.route] = {
        ...piece.content,
        _id: piece._id
      }
      return values
    }, {}))
  }


  static endpoints() {
    return [
      ...super.endpoints()
    ]
  }
}