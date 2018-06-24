import * as React from 'react'
import { withContext } from "with-context";

import User from './models/user'

export const AppContext = React.createContext({
  pieces: {} as {
    [key:string]: {
      _id: string,
      [key:string]: any
    }
  },
  response: undefined as any,
  user: undefined as User
})

export const context = withContext(AppContext)
