
import * as React from "react"

interface Props {
  label?: string,
  type?: string,
  name: string,
  value?: string | number,
  tight?: boolean,
  placeholder?: string,
  autoFocus?: boolean,
  autoComplete?: string,
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const TextField: React.SFC<Props> = (props) => {
  return <React.Fragment>
    {props.label && <label htmlFor={props.name}>{props.label}</label>}
    <input type={props.type || "text"} className={props.tight ? "input--tight" : undefined}
      name={props.name} id={props.name}
      value={props.value}
      placeholder={props.placeholder}
      autoFocus={props.autoFocus}
      autoComplete={props.autoComplete}
      onChange={props.onChange} />
  </React.Fragment>
}