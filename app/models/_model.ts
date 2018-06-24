import axios, { AxiosRequestConfig } from 'axios'


export default class Model {

  static endpoint: string = 'models'

  public _id : string
  public attributes : {[key:string]: any}
  public error: {status: number, message: string, fields?: [{name: string, message: string}]}

  constructor(attributes?: any) {
    this._id = attributes ? attributes._id : undefined
    this.attributes = attributes
  }

  protected static request(method: string, endpoint: string, data?: any) {
    return axios({
      method,
      url: `${process.env.NODE_ENV === 'production' ? '' : '//localhost:8089'}/${this.endpoint}${endpoint}`,
      withCredentials: true,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      responseType: 'json',
      data: data ? JSON.stringify(data) : undefined
    } as AxiosRequestConfig)
      .then(response => {
        return response.data
      })
  }

  static list() {
    return this.request('GET', '')
      .then(json => {
        return json.map ? json.map((model: any)=> new this(model)) : json
      })
  }

  public fetch() {
    return (this.constructor as typeof Model).request('GET', `/${this._id}`)
      .then(json => {
        this._id = json._id
        this.attributes = json
        return this
      })
  }

  public save(data: {[key:string]: any}) {
    return (this.constructor as typeof Model).request(this._id ? 'PUT' : 'POST', `${this._id ? `/${this._id}` : ''}`, data)
      .then(json => {
        this.error = undefined
        this._id = json._id
        this.attributes = json
        return this
      }).catch(error => {
        this.error = {
          ...error.response.data,
          status: error.response.status
        }
        return this
      })
  }

  public destroy() {
    return (this.constructor as typeof Model).request('DELETE', `/${this._id}`)
      .then(json => {
        this._id = undefined
        this.attributes = {}
        return this
      })
  }

}