import { Request } from 'express'

import stripe from '../clients/stripe'
import User from './user'
import Session from './session'


export default class Subscription {
  static collection = 'subscriptions'


  static postprocess(data: any) {
    return Promise.resolve({
      ...data,
      _id: data.id,
      items: data.items.data,
      created: new Date(data.created * 1000), 
      start: new Date(data.start * 1000), 
      current_period_end: new Date(data.current_period_end * 1000),
      current_period_start: new Date(data.current_period_start * 1000)
    })
  }

  static list(user_id) {
    return User.get(user_id).then(user => stripe.customers.retrieve(user.stripe_id)
      .then(customer => Promise.all(customer.subscriptions.data.map(subscription => this.postprocess(subscription)))))
  }

  static create(data) {
    return (data.user_id ? User.get(data.user_id) : User.create({
      email: data.email,
      password: data.password
    }))
      .then(user => user.stripe_id || stripe.customers.create({
        email: data.email
      }).then(customer => {
          User.update(user._id, {stripe_id: customer.id})
          return customer.id
        }))
      .then(customer_stripe_id => stripe.subscriptions.create({
        customer: customer_stripe_id,
        items: [],
        source: data['payment_method.token']
      }))
      .then(subscription => this.postprocess(subscription))
      .then(subscription => Session.create(data).then(session => ({...subscription, session})))
  }

  static destroy(user_id, id) {
    return Promise.resolve({})
  }

  static endpoints() {
    return [
      {
        method: 'GET',
        endpoint: `/${this.collection}`,
        function: (req: Request) : Promise<any[]> => this.list(req.cookies['User-Id'])
      },
      {
        method: 'POST',
        endpoint: `/${this.collection}`,
        function: (req: Request) : Promise<any> => this.create(req.body)
      },
      {
        method: 'DELETE',
        endpoint: `/${this.collection}/:id`,
        function: (req: Request) : Promise<any> => this.destroy(req.cookies['User-Id'], req.params.id)
      }
    ]
  }

  static components(data: any) {
    return {
      [`GET/${this.collection}`]: 'TEST'
    }
  }
}