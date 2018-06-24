import { Request } from 'express'
import { ObjectID } from 'mongodb'

import { ResponseError } from '../helpers/errors'
import { EMAIL, PASSWORD, TEXT, OBJECT_ID } from '../helpers/properties'

import Model from './_model'


export default class Project extends Model {
  static collection = 'projects'
  static properties = {
    name: TEXT,
    description: TEXT,
    location_id: OBJECT_ID
  }
}