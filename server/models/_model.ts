
import { Request, Response } from 'express'
import { MongoClient, ObjectId, Db } from 'mongodb'
import { validate } from 'jsonschema'

import { CONF } from '../../config'

import { ResponseError } from '../helpers/errors'



export default class Model {
  static db: Db
  static collection: string
  static sort = []
  static properties = {}

  static preprocess(data: any) {
    return Promise.resolve(data)
  }

  static postprocess(data: any) {
    return Promise.resolve(data)
  }


  static list(filters, limit=50, page=0, sort?) {
    delete filters.limit
    delete filters.page
    delete filters.sort
    return this.db.collection(this.collection).find(filters, { limit, skip: limit ? page * limit : 0, sort: sort || this.sort }).toArray()
      .then(models => Promise.all(models.map(model => this.postprocess(model))))
  }


  static get(_id) {
    return this.get_where({ _id: new ObjectId(_id) })
  }

  static get_where(filters) {
    return this.db.collection(this.collection).findOne(filters)
      .then(model => this.postprocess(model))
  }

  static create(data) {
    return this.preprocess(data).then(data =>
      this.db.collection(this.collection).insertOne({
        created_at: new Date(),
        ...data
      })
    ).then(result => ({ _id: result.insertedId }))
  }

  static update(_id, data) {
    return this.update_where({ _id: new ObjectId(_id) }, data)
  }

  static update_where(filters, data) {
    return this.preprocess(data).then(data =>
      this.db.collection(this.collection).findOneAndUpdate(filters, { '$set': data }, { returnOriginal: false })
    ).then(result => this.postprocess(result.value))
  }

  static destroy(_id) {
    return this.db.collection(this.collection).deleteOne({ _id: new ObjectId(_id) })
      .then(result => ({ deleted: result.result.n }))
  }

  static aggregate(pipeline) {
    return this.db.collection(this.collection).aggregate(pipeline)
  }

  static commnts(_id) {
    return require('./commnt').list({ route: `${this.collection}/${_id}` })
  }

  static validate(data) {
    
    Object.keys(data).forEach(key => {
      if (this.properties[key] === undefined) {
        delete data[key]
      } else {
        if (this.properties[key].type === 'integer') {
          data[key] = parseInt(data[key])
        }
      }
    })

    const validation = validate(data, {
      type: 'object',
      properties: this.properties
    })

    if (validation.errors.length > 0) {
      throw new ResponseError('validation error', 400, validation.errors.reduce((fields, error)=> {
        const name = error.property.replace('instance.', '')
        fields[name] = this.properties[name].message
          ? this.properties[name].message
          : error.message.replace('{}', error.argument)

        return fields
      }, {}))
    }

    return data
  }


  static endpoints() : {
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    endpoint: string,
    function: (req: Request) => Promise<any> | Promise<any[]> | Promise<{ _id: ObjectId }> | Promise<{ deleted: number }>
  }[] {
    return [
      {
        method: 'GET',
        endpoint: `/${this.collection}`,
        function: (req: Request) : Promise<any[]> => this.list(req.query, req.query.limit, req.query.page, req.query.sort)
      },
      {
        method: 'POST',
        endpoint: `/${this.collection}`,
        function: (req: Request) : Promise<{ _id: ObjectId }> => this.create(this.validate(req.body))
      },
      {
        method: 'GET',
        endpoint: `/${this.collection}/:id`,
        function: (req: Request) : Promise<any> => this.get(req.params.id)
      },
      {
        method: 'PUT',
        endpoint: `/${this.collection}/:id`,
        function: (req: Request) : Promise<any> => this.update(req.params.id, this.validate(req.body))
      },
      {
        method: 'DELETE',
        endpoint: `/${this.collection}/:id`,
        function: (req: Request) : Promise<{ deleted: number }> => this.destroy(req.params.id)
      },
      {
        method: 'GET',
        endpoint: `/${this.collection}/:id/comments`,
        function: (req: Request) : Promise<any[]> => this.commnts(req.params.id)
      }
    ]
  }

  static components(data: any) {
    return {}
  }

}


MongoClient.connect(CONF('MONGO_URI')).then(client => Model.db = client.db(CONF('MONGO_DB')))