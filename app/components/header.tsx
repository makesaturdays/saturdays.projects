
import * as React from "react"

import { Icon } from "./icon"


interface Props {}
interface State {}


export default class Header extends React.Component<Props, State> {

  constructor(props: {}) {
    super(props)
    this.state = {}
  }


  public render() {
    return <header>
      <a href="/" className="grid grid--middle">
        <Icon icon="logo" big highlight />
        <h1 className="h1--base spaced">Make Saturdays</h1>
      </a>
    </header>
  }
}