
import * as React from 'react'
import { context } from '../context'

import Product from '../models/product'
import Review from '../models/review'

import { Form } from '../components/form'
import { Input } from '../components/input'

interface Props {
  product: Product
}
interface State {
  reviews: Review[],
  rating: any
}

@context
export class Reviews extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props)
    this.state = {
      reviews: null,
      rating: undefined
    }
  }

  componentDidMount() {
    this.fetchReviews()
  }

  private fetchReviews() {
    this.props.product.reviews().then(reviews => this.setState({ reviews }))
    this.props.product.rating().then(rating => this.setState({ rating }))
  }

  public render() {
    return <>
      {this.state.rating && <h3>{this.state.rating.rating}</h3>}
      <h3>Reviews</h3>
      <Form model={new Review()} cta='Write Review' values={{product_id: this.props.product._id}} onSubmit={()=> this.fetchReviews()} redirect={false}>
        {[1, 2, 3, 4, 5].map(size => <Input key={size} label={size} value={size} type='radio' name='rating' />)}
        <Input type='text' label='Subject' name='subject' />
        <Input type='textarea' label='Review text' name='body' />
      </Form>
      {this.state.reviews && this.state.reviews.map(review => <div key={review._id}>
        <em>{review.attributes.rating}</em>
        <h3 className='flat_bottom'>{review.attributes.subject}</h3>
        <p>{review.attributes.body}</p>
      </div>)}
    </>
  }
}