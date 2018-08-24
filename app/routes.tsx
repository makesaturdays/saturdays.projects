
import * as React from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'

import { Home } from './routes/home'
import { Login } from './routes/login'
import { Logout } from './routes/logout'
import { ProductView } from './routes/product'
import { NewProjectView } from './routes/new_project'
import { ProjectView } from './routes/project'


interface Props {
  onRoute?: Function
}

export const Routes: React.SFC<Props> = (props) => {
  if (props.onRoute) { props.onRoute() }
  return <Switch>
    <Route exact path='/login' component={Login} />
    <Route exact path='/logout' component={Logout} />
    <Redirect from='/sessions/:_id' to='/' />

    <Route exact path='/products/:_id' component={ProductView} />
    <Route exact path='/projects/new' component={NewProjectView} />
    <Route exact path='/projects/:_id' component={ProjectView} />

    <Route exact path='/' component={Home} />
  </Switch>
}