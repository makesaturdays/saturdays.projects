
import * as React from 'react'
import { FormContext } from '../contexts/form'
import { get } from 'object-path'

interface Props {
  name: string,
  defaultValue?: any,
  value?: any,
  type?: string,
  label?: string | number,
  placeholder?: any,
  optional?: boolean,
  disabled?: boolean,
  autoFocus?: boolean,
  newPassword?: boolean,
  options?: {value: string | number, label: string}[],
  onChange?: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void
}

export const Input: React.SFC<Props> = (props) => {
  return <FormContext.Consumer>
    {context => {
      if (props.type === 'radio') {
        return <>
          <input name={props.name} id={`${context.form_id}_${props.name}_${props.value}`}
            type='radio'
            value={props.value}
            disabled={props.disabled ? true : false}
            onInvalid={context.onInvalid}
            onChange={props.onChange ? props.onChange : context.onChange} />
          {props.label !== undefined && <label htmlFor={`${context.form_id}_${props.name}_${props.value}`}>{props.label}</label>}
        </>
      } else if (props.type === 'select') {
        return <>
          {props.label && <label htmlFor={`${context.form_id}_${props.name}`}>{props.label}</label>}
          <select name={props.name} id={`${context.form_id}_${props.name}`}
            defaultValue={props.defaultValue}
            value={get(context.values, props.name) || props.value || undefined}
            disabled={props.disabled ? true : false}
            autoFocus={props.autoFocus ? true : false}
            onInvalid={context.onInvalid}
            onChange={props.onChange ? props.onChange : context.onChange}>
            <option disabled />
            {props.options.map(option => <option value={option.value} key={option.value}>{option.label}</option>)}
          </select>
        </>
      } else if (props.type === 'textarea') {
        return <>
          {props.label && <label htmlFor={`${context.form_id}_${props.name}`}>{props.label}{props.optional ? ' (Opt.)' : '' }</label>}
          <textarea name={props.name} id={`${context.form_id}_${props.name}`}
            defaultValue={props.defaultValue}
            value={get(context.values, props.name) || props.value || ''}
            rows={5}
            required={props.optional ? false : true}
            disabled={props.disabled ? true : false}
            autoFocus={props.autoFocus ? true : false}
            onInvalid={context.onInvalid}
            onChange={props.onChange ? props.onChange : context.onChange}
            placeholder={props.placeholder} />
        </>
      } else {
        return <>
          {props.label && <label htmlFor={`${context.form_id}_${props.name}`}>{props.label}{props.optional ? ' (Opt.)' : '' }</label>}
          <input name={props.name} id={`${context.form_id}_${props.name}`}
            type={props.type ? props.type : 'text'}
            defaultValue={props.defaultValue}
            value={get(context.values, props.name) || props.value || ''}
            placeholder={props.placeholder}
            required={props.optional ? false : true}
            disabled={props.disabled ? true : false}
            autoFocus={props.autoFocus ? true : false}
            autoComplete={props.type == 'password' && props.newPassword ? 'new-password' : props.type == 'search' ? 'off' : null}
            step={props.type == 'number' ? 'any' : null}
            onInvalid={context.onInvalid}
            onChange={props.onChange ? props.onChange : context.onChange} />
          {context.errorFields && context.errorFields[props.name] && <div className='alert'>{context.errorFields[props.name]}</div>}
        </>
      }
    }}
  </FormContext.Consumer>
}