
import * as React from 'react'
import { Link } from 'react-router-dom'

import { AppContext } from '../context'
import { Icon } from './icon'
import { P } from './piece'

interface Props {}

export const Header: React.SFC<Props> = (props) => {
  return <AppContext.Consumer>
      {(context) => <header>
      <div className='grid grid--spaced'>
        <div>
          <Link to='/' className='grid grid--middle'>
            <Icon i='logo' big highlight />
            <h1 className="h1--base spaced"><P piece={context.pieces.index} k='title' /></h1>
          </Link>
        </div>

        <div>
          {context.user && context.user._id 
            ? <>
              <Link to='/subscription'>Your Subscription</Link><br />
              <Link to='/logout'>Logout</Link>
            </>
            : <>
              <Link to='/subscribe'>Subscribe</Link><br />
              <Link to='/login'>Login</Link>
            </>
          }
        </div>
      </div>
    </header>}
  </AppContext.Consumer>
}