
import * as React from 'react'
import { context } from '../context'

import { Link, RouteComponentProps } from 'react-router-dom'

import Product from '../models/product'
import { Reviews } from '../components/reviews'


interface Props extends RouteComponentProps<any> {
  context: {
    response: any
  }
}
interface State {
  product: Product,
  plans: any[]
}


@context
export class ProductView extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props)
    this.state = {
      product: props.context.response ? new Product(props.context.response) : new Product({_id: props.match.params._id}),
      plans: null
    }
  }
  

  componentDidMount() {
    this.state.product.fetch().then(product => this.setState({ product }))
    this.state.product.plans().then(plans => this.setState({ plans }))
  }


  public render() {
    return <div className='padded'>
      <div>
        {this.state.product && <h1>{this.state.product.attributes.name}</h1>}
        {this.state.plans && this.state.plans.map(plan => <h2 key={plan.id}>{plan.id}</h2>)}
        <Reviews product={this.state.product} />
      </div>
    </div>
  }
}