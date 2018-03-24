
import * as React from "react"

interface Props {
  label: string
}

export const Tag: React.SFC<Props> = (props) => {
  return <span className="tag">{props.label}</span>
}