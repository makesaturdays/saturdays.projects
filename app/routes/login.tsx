
import * as React from 'react'
import { Link, RouteComponentProps } from 'react-router-dom'

import { withContext, AppContextProps } from '../contexts/app'

import Session from '../models/session'
import User from '../models/user'

import { Form } from '../components/form'
import { Input } from '../components/input'
import { Grid, Half } from '../components/grid'


interface Props extends RouteComponentProps<any> {}
interface State {
  session: Session
}

@withContext
export class Login extends React.Component<Props & AppContextProps, State> {

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
    return <Grid center>
      <Half>
        <Form id='login' model={this.state.session} onSubmit={(e, state)=> this.props.context.fetchUser()} cta='Login'>
          <Input label='Email Address' name='email' />
          <Input label='Password' type='password' name='password' />
        </Form>

        <Link to='/subscribe' className='underline'>I'm not yet subscribed</Link>
      </Half>
    </Grid>
  }
}



