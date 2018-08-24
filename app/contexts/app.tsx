import * as React from 'react'
import User from '../models/user'

export const AppContext = React.createContext({
  pieces: {} as {
    [key:string]: {
      _id: string,
      [key:string]: any
    }
  },
  response: undefined as any,
  user: undefined as User,
  editable: false as boolean,
  fetchUser: ()=> function(): void {},
  clearUser: ()=> function(): void {}
})

export interface AppContextProps {
  context? : {
    pieces: {
      [key:string]: {
        _id: string,
        [key:string]: any
      }
    },
    response: any,
    user: User,
    editable: boolean,
    fetchUser?: ()=> void,
    clearUser?: ()=> void
  }
}

export function withContext<T extends React.ComponentClass>(Component: T): T {
  return ((props: any)=> <AppContext.Consumer>{context => <Component {...props} context={context} />}</AppContext.Consumer>) as any as T
}