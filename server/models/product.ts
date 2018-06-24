import { Request } from 'express'
import { ObjectID } from 'mongodb'

import stripe from '../clients/stripe'

import { ProductView } from '../../app/routes/product'
import Model from './_model';


export default class Product extends Model {
  static collection = 'products'


  static components(data: any) {
    return {
      [`GET/${this.collection}/:id`]: ProductView
    }
  }
}