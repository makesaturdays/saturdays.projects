
import * as React from 'react'
import { FormContext } from './form'
import { Input } from './input'
import { Address, Props as AddressProps } from './address'

interface Props {
  name: string,
  address?: AddressProps,
  value?: any,
  label?: string
}
interface State {
  token: string
}

export class PaymentMethod extends React.Component<Props, State> {

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

    this.stripe = Stripe('pk_test_W9K3sLk7MpKZoUfjB41FCJ7Z')
    this.elements = this.stripe.elements()
    this.number = this.elements.create('cardNumber', style)
    this.expiry = this.elements.create('cardExpiry', style)
    this.cvc = this.elements.create('cardCvc', style)
    this.number.addEventListener('change', (e: Event) => this.onChange(e, this.number))
    this.expiry.addEventListener('change', (e: Event) => this.onChange(e, this.expiry))
    this.cvc.addEventListener('change', (e: Event) => this.onChange(e, this.cvc))

    this.number.mount(this.number_element)
    this.expiry.mount(this.expiry_element)
    this.cvc.mount(this.cvc_element)
  }

  onChange(event: Event, element: any) {
    element.complete = event.complete;
    if (this.number.complete && this.expiry.complete && this.cvc.complete) {
      this.stripe.createToken(this.number).then((result: any) => {
        this.context.onChange({
          currentTarget: {
            name: `${this.props.name}.token`,
            value: result.token.id
          }
        })
      })
    }
  }


  public render() {
    return <>
      <label>{this.props.label}</label>
      <div className='grid grid--guttered'>
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

      <FormContext.Consumer>
        {(context) => {
          this.context = context
          return null
        }}
      </FormContext.Consumer>
    </>
  }
}