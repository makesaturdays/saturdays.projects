
import * as React from 'react'
import { AppContext } from '../context'

import { Link, RouteComponentProps } from 'react-router-dom'
import { Button } from '../components/button'
import { P } from '../components/piece'

import Product from '../models/product'


interface Props extends RouteComponentProps<any> {}
interface State {
  products: Product[]
}

export class Index extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props)
    this.state = {
      products: null
    }
  }

  componentDidMount() {
    Product.list().then(products => this.setState({ products }))
  }

  public render() {
    return <AppContext.Consumer>
      {(context) => <div className='padded'>
        <div>
          {this.state.products && this.state.products.map(product => <Link to={`/products/${product.attributes._id}`} key={product.attributes._id}>{product.attributes.name}</Link>)}
        </div>
      </div>}
     </AppContext.Consumer>
  }
}