
import * as React from 'react'
import { BrowserRouter } from 'react-router-dom'
import * as cookies from 'browser-cookies'

import Piece from '../models/piece'
import User from '../models/user'

import { AppContext } from '../contexts/app'

import { Routes } from '../routes'
import { Footer } from './footer'
import { Header } from './header'



interface Props {}
interface State {
  pieces: any,
  response: any,
  user: User
}

export class App extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props)
    this.state = {
      pieces: window.pieces,
      response: window.response,
      user: new User({_id: cookies.get('Session-Id') ? 'me' : undefined})
    }
  }

  componentDidMount() {
    if (!this.state.pieces) { Piece.list().then(pieces => this.setState({ pieces })) }
    if (this.state.user._id) { this.state.user.fetch().then(user => this.setState({ user: this.state.user })) }
  }

  private fetchUser() {
    new User({_id: 'me'}).fetch().then(user => this.setState({ user }))
  }

  private clearUser() {
    this.setState({ user: new User({_id: undefined}) })
  }

  public render() {
    return this.state.pieces
      ? <AppContext.Provider value={{
        pieces: this.state.pieces,
        response: this.state.response,
        user: this.state.user,
        editable: false,
        fetchUser: this.fetchUser.bind(this),
        clearUser: this.clearUser.bind(this)
      }}>
        <BrowserRouter>
          <>
            <Header />
            <div className='main' role='main'><Routes onRoute={()=> window.scrollTo(0, 0)} /></div>
            <Footer />
          </>
        </BrowserRouter>
      </AppContext.Provider>
      : null
  }

}

