
import * as compression from "compression"
import * as express from "express"

import * as ReactDOM from "react-dom/server"
import * as React from "react"
import { StaticRouter } from "react-router-dom"

import { Routes } from "../app/routes"
import Header from "../app/components/header"
import Footer from "../app/components/footer"

const server = express()

server.use('/dist', express.static(`${__dirname}`))
server.use('/files', express.static(`${__dirname}/../files`))

server.get('/*', (req, res) => {
  res.send(ReactDOM.renderToString(
    <html>
    <head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      <title>Make Saturdays</title>
      <link rel="stylesheet" type="text/css" href="/dist/app.css" />
    </head>
    <body>
      
      <Header />
      <section className="main" role="main">
        <StaticRouter location={req.originalUrl} context={{}}>
          <Routes />
        </StaticRouter>
      </section>
      <Footer />
      
      <script src="/dist/app.js"></script>
    </body>
    </html>
  ))
})


const port = process.env.PORT || 5000
server.listen(port, () => {
  console.log(`Listening on port ${port}...`)
});