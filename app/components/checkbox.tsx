
import * as React from "react"

interface Props {
  label: string,
  name: string,
  checked: boolean,
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const Checkbox: React.SFC<Props> = (props) => {
  return <React.Fragment>
    <input type="checkbox" name={props.name} id={props.name} checked={props.checked} onChange={props.onChange} />
    <label htmlFor={props.name}>{props.label}</label>
  </React.Fragment>
}