
import * as React from 'react'
import { Input } from './input'

export interface Props {
  name: string,
  value?: any,
  label?: string
}

export const Address: React.SFC<Props> = (props) => {
  return <>
    <label htmlFor={`${props.name}.first_name`}>{props.label}</label>
    <div className='grid grid--guttered'>
      <div className='col col--6of12'>
        <Input label='First Name' name={`${props.name}.first_name`} />
      </div>
      <div className='col col--6of12'>
        <Input label='Last Name' name={`${props.name}.last_name`} />
      </div>
      <div className='col col--9of12'>
        <Input label='Street address' name={`${props.name}.address_1`} />
      </div>
      <div className='col col--3of12'>
        <Input label='Apt#' name={`${props.name}.address_2`} optional />
      </div>
      <div className='col col--6of12'>
        <Input label='City' name={`${props.name}.city`} />
      </div>
      <div className='col col--6of12'>
        <Input label='Country' name={`${props.name}.country`} />
      </div>
      <div className='col col--6of12'>
        <Input label='State' name={`${props.name}.state`} />
      </div>
      <div className='col col--6of12'>
        <Input label='Postal code' name={`${props.name}.postal_code`} />
      </div>
    </div>
  </>
}