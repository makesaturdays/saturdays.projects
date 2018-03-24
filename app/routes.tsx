import * as ReactDOM from "react-dom"
import * as React from "react"
import { Route, Switch } from "react-router-dom"

import { Home } from "./routes/home"

export const Routes = ()=> <Switch>
  <Route exact path="/" component={Home} />
</Switch>