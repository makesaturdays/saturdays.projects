
import Model from './_model'
import Commnt from './commnt'

export default class Product extends Model {
  static endpoint = 'products'

  public rating() {
    return (this.constructor as typeof Model).request('GET', `/${this._id}/rating`)
  }

  public comments() {
    return (this.constructor as typeof Model).request('GET', `/${this._id}/comments`)
      .then(comments => comments.map((comment: {}) => new Commnt(comment)))
  }
}