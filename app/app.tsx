
import '../styles/styles.scss'

import * as ReactDOM from 'react-dom'
import * as React from 'react'

import Piece from './models/piece'
import User from './models/user'

import { App } from './components/app'


declare global {
  interface Window {
    pieces: any,
    response: any,
    user: User,
    Stripe: Function
  }
}


if (window.pieces) {
  ReactDOM.hydrate(<App />, document.getElementById('app'))
} else {
  ReactDOM.render(<App />, document.getElementById('app'))
}

