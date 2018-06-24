
import * as React from 'react'
import { context } from '../context'

import { Link, RouteComponentProps } from 'react-router-dom'
import { Button } from '../components/button'
import { P } from '../components/piece'

import { date } from '../helpers/formatters'

import Subscription from '../models/subscription'
import User from '../models/subscription'


interface Props extends RouteComponentProps<any> {
  context: {
    user: User
  }
}
interface State {
  subscriptions: Subscription[]
}

@context
export class SubscriptionView extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props)
    this.state = {
      subscriptions: null
    }
  }

  componentDidMount() {
    Subscription.list().then(subscriptions => this.setState({ subscriptions }))
  }

  public render() {
    return <div className='padded'>
      <div>
        Email: {this.props.context.user.attributes.email}<br />
        Subscriptions:<br />
        {this.state.subscriptions && this.state.subscriptions.map(subscription => <div key={subscription.attributes._id}>
          Id: {subscription._id}<br />
          Items:<br />
          <ul>
          {subscription.attributes.items.map(item => <li key={item.id}>{item.plan.nickname} x {item.quantity}</li>)}
          </ul>
          Next order at: {date(subscription.attributes.current_period_end)}
        </div>)}
      </div>
    </div>
  }
}