
import * as React from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'

import { Home } from './routes/home'
import { Subscribe } from './routes/subscribe'
import { Login } from './routes/login'
import { Logout } from './routes/logout'
import { SubscriptionView } from './routes/subscription'
import { ProductView } from './routes/product'


interface Props {}

export const Routes: React.SFC<Props> = (props) => {
  return <>
    <Switch>
      <Route exact path='/subscribe' component={Subscribe} />
      <Route exact path='/login' component={Login} />
      <Route exact path='/logout' component={Logout} />
      <Redirect from='/sessions/:_id' to='/subscription' />

      <Route exact path='/subscription' component={SubscriptionView} />
      <Redirect from='/subscriptions/:_id' to='/subscription' />

      <Route exact path='/products/:_id' component={ProductView} />

      <Route exact path='/' component={Home} />
    </Switch>
  </>
}