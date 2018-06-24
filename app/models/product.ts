
import Model from './_model'
import Review from './review'

export default class Product extends Model {
  static endpoint = 'products'

  public plans() {
    return (this.constructor as typeof Model).request('GET', `/${this._id}/plans`)
  }

  public rating() {
    return (this.constructor as typeof Model).request('GET', `/${this._id}/rating`)
  }

  public reviews() {
    return (this.constructor as typeof Model).request('GET', `/${this._id}/reviews`)
      .then(reviews => reviews.map((review: {}) => new Review(review)))
  }
}