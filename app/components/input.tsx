
import * as React from 'react'
import { FormContext } from './form'

interface Props {
  name: string,
  defaultValue?: any,
  value?: any,
  type?: string,
  label?: string | number,
  optional?: boolean,
  disabled?: boolean,
  autoFocus?: boolean,
  newPassword?: boolean
}

export const Input: React.SFC<Props> = (props) => {
  return <FormContext.Consumer>
    {(context) => {
      if (props.type === 'radio') {
        return <>
          <input name={props.name} id={`${props.name}_${props.value}`}
            type='radio'
            value={props.value}
            disabled={props.disabled ? true : false}
            onChange={context.onChange} />
          {props.label !== undefined && <label htmlFor={`${props.name}_${props.value}`}>{props.label}</label>}
        </>
      } else if (props.type === 'textarea') {
        return <>
          {props.label && <label htmlFor={props.name}>{props.label}{props.optional ? ' (Optional)' : '' }</label>}
          <textarea name={props.name} id={props.name}
            rows={6}
            required={props.optional ? false : true}
            disabled={props.disabled ? true : false}
            autoFocus={props.autoFocus ? true : false}
            onChange={context.onChange}>
            {context.values[props.name] || props.value || props.defaultValue}
          </textarea>
        </>
      } else {
        return <>
          {props.label && <label htmlFor={props.name}>{props.label}{props.optional ? ' (Optional)' : '' }</label>}
          <input name={props.name} id={props.name}
            type={props.type ? props.type : 'text'}
            defaultValue={props.defaultValue}
            value={context.values[props.name] || props.value || ''}
            required={props.optional ? false : true}
            disabled={props.disabled ? true : false}
            autoFocus={props.autoFocus ? true : false}
            autoComplete={props.type == 'password' && props.newPassword ? 'new-password' : props.type == 'search' ? 'off' : null}
            step={props.type == 'number' ? 'any' : null}
            onChange={context.onChange} />
          {context.errorFields && context.errorFields[props.name] && <div className='alert'>{context.errorFields[props.name]}</div>}
        </>
      }
    }}
  </FormContext.Consumer>
}