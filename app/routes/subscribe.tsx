
import * as React from 'react'
import { Link, RouteComponentProps } from 'react-router-dom'
import * as cookies from 'browser-cookies'

import { context } from '../context'

import { Button } from '../components/button'
import { Form } from '../components/form'
import { Input } from '../components/input'
import { Address } from '../components/address'
import { PaymentMethod } from '../components/payment_method'

import Subscription from '../models/subscription'
import User from '../models/user';


interface Props extends RouteComponentProps<any> {
  context: {
    user: User
  }
}
interface State {
  subscription: Subscription
}

@context
export class Subscribe extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props)
    this.state = {
      subscription: new Subscription()
    }
  }

  componentDidMount() {
  }

  private login(user: User, session: any) {
    cookies.set('Session-Id', session._id)
    cookies.set('Session-Secret', session.secret)
    cookies.set('User-Id', session.user_id)

    user._id = session.user_id
    user.fetch()
  }

  public render() {
    return <div className='padded'>
      <div className=''>
        <Form model={this.state.subscription} onSubmit={(e, state)=> this.login(this.props.context.user, state.model.attributes.session)} cta='Subscribe'>
          <Input label='Email Address' name='email' />
          <Input label='Password' type='password' name='password' newPassword />
          <Input label='Date of Birth' type='date' name='date_of_birth' />
          {['N', '1', '2', '3', '4', '5', '6'].map(size => <Input key={size} label={size} value={size} type='radio' name='size' />)}

          <Address label='Shipping address' name='shipping_address' />
          <PaymentMethod label='Payment method' name='payment_method' />
        </Form>
      </div>
    </div>
  }
}



