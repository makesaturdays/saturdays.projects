
import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import compression from 'compression'
import morgan from 'morgan'
import * as bodyparser from 'body-parser'

import * as ReactDOM from 'react-dom/server'
import * as React from 'react'

import { CONF } from '../config'

import { Routes } from '../app/routes'
import { HTML } from '../app/components/html'
import { sendError } from './helpers/errors'

import User from './models/user'
import Session from './models/session'
import Piece from './models/piece'
import Product from './models/product'
import Subscription from './models/subscription'
import Project from './models/project'



interface Server extends Application {}

export const server: Server = express()
server.use(cors({origin: CONF('ORIGIN').split(','), credentials: true}))
server.use(bodyparser.json())
server.use(compression())
server.use(morgan('dev'))

server.use('/files', express.static(`${__dirname}`))
server.use('/dist', express.static(`${__dirname}`))

const models = [
  User,
  Session,
  Piece,
  Project,
  Product,
  Subscription
]

models.forEach(model => {
  model.endpoints().forEach(endpoint => server[endpoint.method.toLowerCase()](
    `${endpoint.endpoint}`,
    (req: Request, res: Response) => {
      try {
        endpoint.function(req)
          .then((response: any)=> {
            req.accepts('text/html') === 'text/html'
              ? Promise.all([
                  Piece.list({})
                ]).then(([pieces])=> {
                  res.send(ReactDOM.renderToString(
                    <HTML
                      pieces={pieces}
                      response={response}>
                      {React.createElement(model.components(response)[`${endpoint.method}${endpoint.endpoint}`])
                      || JSON.stringify(response)}
                    </HTML>
                  ))
                })
              : res.json(response)
          })
          .catch(error => sendError(res, error))
      } catch (error) {
        sendError(res, error)
      }
    }
  ))
})


server.get('/*', (req: Request, res: Response) => {
  Promise.all([
    Piece.list({})
  ]).then(([pieces, user])=> {
    res.send(ReactDOM.renderToString(
      <HTML pieces={pieces}>
        <Routes />
      </HTML>
    ))
  })
})



const port = CONF('SERVER_PORT')
server.listen(port, () => {
  console.log(`Listening on port ${port}...`)
})