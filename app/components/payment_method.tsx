
import * as React from 'react'
import { withFormContext, FormContextProps } from '../contexts/form'
import { Input } from './input'
import { Address, Props as AddressProps } from './address'

interface Props {
  name: string,
  address?: AddressProps,
  value?: any
}
interface State {
  token: string
}

@withFormContext
export class PaymentMethod extends React.Component<Props & FormContextProps, State> {

  stripe: any
  elements: any
  number: any
  expiry: any
  cvc: any

  number_element: HTMLDivElement
  expiry_element: HTMLDivElement
  cvc_element: HTMLDivElement

  constructor(props: Props) {
    super(props)

    this.state = {
      token: ''
    }
  }

  componentDidMount() {
    const style = { style: {
      base: { color: "#111", fontSize: "16px" },
      invalid: { color: "#E14B3C", iconColor: "#E14B3C" }
    } }

    this.stripe = window.Stripe('pk_test_W9K3sLk7MpKZoUfjB41FCJ7Z')
    this.elements = this.stripe.elements()
    this.number = this.elements.create('cardNumber', style)
    this.expiry = this.elements.create('cardExpiry', style)
    this.cvc = this.elements.create('cardCvc', style)
    this.number.addEventListener('change', (e: {complete: boolean} & Event) => this.onChange(e, this.number))
    this.expiry.addEventListener('change', (e: {complete: boolean} & Event) => this.onChange(e, this.expiry))
    this.cvc.addEventListener('change', (e: {complete: boolean} & Event) => this.onChange(e, this.cvc))

    this.number.mount(this.number_element)
    this.expiry.mount(this.expiry_element)
    this.cvc.mount(this.cvc_element)
  }

  onChange(event: {complete: boolean} & Event, element: any) {
    element.complete = event.complete
    if (this.number.complete && this.expiry.complete && this.cvc.complete) {
      this.stripe.createToken(this.number).then((result: any) => {
        this.props.context.onChange({
          currentTarget: {
            name: this.props.name,
            value: {
              token: result.token.id
            }
          }
        })
      })
    }
  }


  public render() {
    return <>
      <div className='grid grid--tight_guttered'>
        <div className='col col--9of12'>
          <label>Credit Card #</label>
          <div className='input' ref={(div) => { this.number_element = div }} />
        </div>
        <div className='col col--3of12'>
          <label>Expiry</label>
          <div className='input' ref={(div) => { this.expiry_element = div }} />
        </div>
        <div className='col col--6of12'>
          <label>CVC</label>
          <div className='input' ref={(div) => { this.cvc_element = div }} />
        </div>
      </div>
    </>
  }
}