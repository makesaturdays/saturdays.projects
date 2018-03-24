
import "../styles/all.scss"

import * as ReactDOM from "react-dom"
import * as React from "react"
import { BrowserRouter } from "react-router-dom"

import { Routes } from "./routes"

import Header from "./components/header"
import Footer from "./components/footer"

const element = document.getElementById('app')
const app = [
  <Header key="header" />,
  <section key="main" className="main" role="main">
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  </section>,
  <Footer key="footer" />
]

if (process.env.NODE_ENV === 'production') {
  ReactDOM.hydrate(app, element)
} else {
  ReactDOM.render(app, element)
}
  