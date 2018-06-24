
import * as React from 'react'
import { StaticRouter } from 'react-router-dom'

import { AppContext } from '../context'
import { P } from './piece'

import { Header } from './header'
import { Footer } from './footer'


interface Props {
  pieces: {
    [key:string]: {
      _id: string,
      [key:string]: any
    }
  },
  response?: any
}

export const HTML: React.SFC<Props> = (props) => {
  return <AppContext.Provider value={{
    pieces: props.pieces,
    response: props.response,
    user: undefined
  }}>
    <html>
    <head>
      <meta charSet='utf-8' />
      <meta name='viewport' content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no' />
      <title><P piece={props.pieces.index} k='title' /></title>
      <link rel='stylesheet' type='text/css' href='/dist/app.css' />
    </head>
    <body>
      <section className='app' id='app'>
        <StaticRouter context={{}}>
          <>
            <Header />
            <div className='main' role='main'>{props.children}</div>
            <Footer />
          </>
        </StaticRouter>
      </section>
      
      <script dangerouslySetInnerHTML={{ __html: `window.pieces = ${JSON.stringify(props.pieces)}` }} />
      <script dangerouslySetInnerHTML={{ __html: `window.response = ${JSON.stringify(props.response)}` }} />
      <script src='/dist/app.js'></script>
    </body>
    </html>
  </AppContext.Provider>
}