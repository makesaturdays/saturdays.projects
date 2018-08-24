
import * as React from 'react'
import { Link, Redirect, RouteComponentProps } from 'react-router-dom'

import { withContext, AppContextProps } from '../contexts/app'

import Session from '../models/session'


interface Props extends RouteComponentProps<any> {}
interface State {}

@withContext
export class Logout extends React.Component<Props & AppContextProps, State> {

  componentDidMount() {
    new Session({_id: 'mine'}).destroy()
    this.props.context.clearUser()
  }

  public render() {
    return <Redirect to='/' />
  }
  
}


