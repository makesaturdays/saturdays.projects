
import * as React from "react"
import { Button } from "../components/button"
import { Tag } from "../components/tag"

interface Props {}

export const Home: React.SFC<Props> = (props) => {
  return <div className="padded padded--big_top">
    <h1>Make Saturdays</h1>
  </div>
}