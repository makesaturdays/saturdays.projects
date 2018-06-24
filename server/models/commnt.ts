

import Model from './_model'
import { TEXT } from '../helpers/properties'

export default class Commnt extends Model {
  static collection = 'comments'
  static sort = [['created_at', -1]]
  static properties = {
    subject: TEXT,
    body: TEXT,
    route: TEXT
  }
}