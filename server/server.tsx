
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
  Product
]

models.forEach(model => {
  Object.entries(model.endpoints()).forEach(([endpoint, methods])=> {
    
    Object.entries(methods).forEach(([method, configuration]) => {
      configuration.middlewares && configuration.middlewares.forEach(middleware => server[method.toLowerCase() as keyof Application](`${endpoint}`, middleware))

      server[method.toLowerCase() as keyof Application](
        `${endpoint}`,
        (req: Request, res: Response) => {
          try {
            configuration.function(req, res)
              .then(response => {
                req.accepts('text/html') === 'text/html'
                  ? configuration.component
                    ? Promise.all([
                      Piece.pieces({})
                    ]).then(([pieces])=> {
                      res.send(ReactDOM.renderToString(
                        <HTML
                          url={req.originalUrl}
                          pieces={pieces}
                          response={response}>
                          {React.createElement(configuration.component)}
                        </HTML>
                      ))
                    })
                    : res.json(response)
                  : res.json(response)
              })
              .catch(error => sendError(res, error))
          } catch (error) {
            sendError(res, error)
          }
        }
      )
    })
      
  })
})


server.get('/*', (req: Request, res: Response) => {
  Promise.all([
    Piece.pieces({})
  ]).then(([pieces, user])=> {
    res.send(ReactDOM.renderToString(
      <HTML url={req.originalUrl} pieces={pieces}>
        <Routes />
      </HTML>
    ))
  })
})



const port = CONF('SERVER_PORT')
server.listen(port, () => {
  console.log(`Listening on port ${port}...`)
})