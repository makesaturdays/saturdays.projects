
import { Request, Response, NextFunction } from 'express'
import { MongoClient, ObjectId, Db } from 'mongodb'
import { validate } from 'jsonschema'

import { CONF } from '../../config'

import { ResponseError } from '../helpers/errors'


export interface Endpoints {
  [endpoint: string]: {
    [method: string]: {
      function: (req: Request, res?: Response) => Promise<any>,
      middlewares?: ((req: Request, res: Response, next?: NextFunction) => void)[],
      component?: React.ComponentClass
    }
  }
}

export interface Properties {
  [key: string]: any
}
export interface Filters {
  [key: string]: any
}
export interface Sort {
  [key: string]: 1 | -1
}

export type Id = string | ObjectId


export default class Model {
  static db: Db
  static collection: string
  static sort: Sort
  static properties: Properties = {}

  static preprocess(data: any) {
    return Promise.resolve(data)
  }

  static postprocess(data: any) {
    return Promise.resolve(data)
  }


  static list(filters: Filters, limit=50, page=0, sort?: Sort) {
    return this.db.collection(this.collection).find(filters, { limit, skip: limit ? page * limit : 0, sort: sort || this.sort }).toArray()
      .then(models => Promise.all(models.map(model => this.postprocess(model))))
  }


  static get(_id: Id) {
    return this.get_where({ _id: new ObjectId(_id) })
  }

  static get_where(filters: Filters) {
    return this.db.collection(this.collection).findOne(filters)
      .then(model => this.postprocess(model))
  }

  static create(data: any) {
    return this.preprocess(data).then(data =>
      this.db.collection(this.collection).insertOne({
        created_at: new Date(),
        ...data
      })
    ).then(result => ({ _id: result.insertedId }))
  }

  static update(_id: Id, data: any) {
    return this.update_where({ _id: new ObjectId(_id) }, data)
  }

  static update_where(filters: Filters, data: any) {
    return this.preprocess(data).then(data =>
      this.db.collection(this.collection).findOneAndUpdate(filters, { '$set': data }, { returnOriginal: false })
    ).then(result => this.postprocess(result.value))
  }

  static destroy(_id: Id) {
    return this.destroy_where({ _id: new ObjectId(_id) })
  }

  static destroy_where(filters: Filters) {
    return this.db.collection(this.collection).deleteOne(filters)
      .then(result => ({ deleted: result.result.n }))
  }

  static aggregate(pipeline: any[]) {
    return this.db.collection(this.collection).aggregate(pipeline)
  }

  
  static tagged(tags: string[], limit=50, page=0, sort?: Sort) {
    return this.list({tags: {'$all': tags}}, limit, page, sort)
  }


  static commnts(_id: Id) {
    return require('./commnt').list({ route: `${this.collection}/${_id}` })
  }

  static validate(data: any, update=false): any {
    
    Object.keys(data).forEach(key => {
      if (this.properties[key] === undefined) {
        delete data[key]
      } else if (this.properties[key].sanitize) {
        data[key] = this.properties[key].sanitize(data[key])
      }
    })

    const validation = validate(data, {
      type: 'object',
      properties: update ? Object.keys(this.properties).reduce((properties: Properties, k)=> {
        properties[k] = {
          ...this.properties[k],
          required: false
        }
        return properties
      }, {}) : this.properties
    })

    if (validation.errors.length > 0) {
      throw new ResponseError('validation error', 400, validation.errors.reduce((fields: {[name: string]: string}, error)=> {
        const name = error.property.replace('instance.', '')
        fields[name] = this.properties[name].message
          ? this.properties[name].message
          : error.message.replace('{}', error.argument)

        return fields
      }, {}))
    }

    return data
  }


  static endpoints() : Endpoints {
    return {
      [`/${this.collection}`]: {
        'GET': {
          function: (req: Request) : Promise<any[]> => this.list(null, req.query.limit, req.query.page, req.query.sort)
        },
        'POST': {
          function: (req: Request) : Promise<{ _id: ObjectId }> => this.create(this.validate(req.body))
        }
      },
      [`/${this.collection}/:id`]: {
        'GET': {
          function: (req: Request) : Promise<any> => this.get(req.params.id)
        },
        'PUT': {
          function: (req: Request) : Promise<any> => this.update(req.params.id, this.validate(req.body, true))
        },
        'DELETE': {
          function: (req: Request) : Promise<{ deleted: number }> => this.destroy(req.params.id)
        }
      }
    }
  }
}


MongoClient.connect(CONF('MONGO_URI')).then(client => Model.db = client.db(CONF('MONGO_DB')))