
import * as React from 'react'

import { Link, RouteComponentProps } from 'react-router-dom'

import Product from '../models/product'
import { withContext } from '../contexts/app'


interface Props extends RouteComponentProps<any> {
  context: {
    response: any
  }
}
interface State {
  product: Product,
  plans: any[]
}


@withContext
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
  }


  public render() {
    return <div className='padded'>
      <div>
        {this.state.product && <h1>{this.state.product.attributes.name}</h1>}
      </div>
    </div>
  }
}