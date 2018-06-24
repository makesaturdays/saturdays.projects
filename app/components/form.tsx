

import * as React from 'react'
import { Redirect } from 'react-router-dom'

export const FormContext = React.createContext({
  values: {} as { [key:string]: any },
  onChange: function(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void {},
  errorFields: undefined as {[name:string]: any}
})


import Model from '../models/_model'

interface Props {
  model: Model,
  values?: { [key:string]: any },
  cta?: string,
  redirect?: string | boolean,
  onSubmit?: Function
}
interface State {
  model: Model,
  values: { [key:string]: any },
  success: boolean
}

export class Form extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props)
    this.state = {
      model: props.model,
      values: props.values || {},
      success: false
    }
  }

  onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    this.state.model.save(this.state.values)
      .then(model => {
        if (model.error) {
          this.setState({
            model
          })
        } else {
          if (this.props.onSubmit) {
            this.props.onSubmit(e, this.state)
          }
          this.setState({ 
            model,
            values: {},
            success: true
          })
        }
      })
  }

  onChange(e: React.ChangeEvent<HTMLInputElement>) {
    let value: any = e.currentTarget.value
    if (e.currentTarget.type === 'checkbox') {
      value = e.currentTarget.checked
    }

    this.setState({
      values : {
        ...this.state.values,
        [e.currentTarget.name]: value
      }
    })
  }

  public render() {
    return <form onSubmit={this.onSubmit.bind(this)}>
      <FormContext.Provider value={{
          onChange: this.onChange.bind(this),
          values: this.state.values,
          errorFields: this.state.model.error && this.state.model.error.fields
        }}>
        {this.props.children}
      </FormContext.Provider>
      {this.state.model.error && <div className='alert'>{this.state.model.error.message}</div>}
      <button className='normal_top' type='submit' disabled={Object.keys(this.state.values).length === 0}>{this.props.cta || 'Save'}</button>
      {this.state.success && this.props.redirect !== false && <Redirect push to={this.props.redirect ? this.props.redirect as string : `/${(this.state.model.constructor as typeof Model).endpoint}/${this.state.model._id}`} />}
    </form>
  }
}