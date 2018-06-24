
import * as React from 'react'
import { Link, RouteComponentProps } from 'react-router-dom'

import { AppContext } from '../context'

import { Button } from '../components/button'
import { Form } from '../components/form'
import { Input } from '../components/input'

import Session from '../models/session'
import User from '../models/user';


interface Props extends RouteComponentProps<any> {}
interface State {
  session: Session
}

export class Login extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props)
    this.state = {
      session: new Session()
    }
  }

  componentDidMount() {
  }

  private fetchUser(user: User, user_id: string) {
    user._id = user_id
    user.fetch()
  }

  public render() {
    return <AppContext.Consumer>
      {(context) => <div className='padded'>
      <div className=''>
        <Form model={this.state.session} onSubmit={(e, state)=> this.fetchUser(context.user, state.model.attributes.user_id)} cta='Login'>
          <Input label='Email Address' name='email' />
          <Input label='Password' type='password' name='password' />
        </Form>
      </div>
    </div>}
    </AppContext.Consumer>
  }
}



