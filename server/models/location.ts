import { Request } from 'express'
import { ObjectID } from 'mongodb'

import { ResponseError } from '../helpers/errors'
import { EMAIL, PASSWORD, TEXT } from '../helpers/properties'

import Model from './_model'


export default class Location extends Model {
  static collection = 'locations'
  static properties = {
    name: TEXT,
    description: TEXT,
    address: TEXT,
    url: TEXT
  }
}