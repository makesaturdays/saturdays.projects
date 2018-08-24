

import * as React from 'react'
import { Redirect } from 'react-router-dom'
import { set } from 'object-path'

import Model from '../models/_model'
import { FormContext } from '../contexts/form'

import { Button } from './button'


interface Props {
  id: string,
  model: Model,
  values?: { [key:string]: any },
  cta?: string,
  redirect?: string | boolean,
  onSubmit?: (e: React.FormEvent<HTMLFormElement>, state: State)=> void
}
interface State {
  model: Model,
  values: { [key:string]: any },
  invalids: { [key:string]: boolean },
  waiting: boolean,
  success: boolean
}

export class Form extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props)
    this.state = {
      model: props.model,
      values: props.values || {},
      invalids: {},
      waiting: false,
      success: false
    }
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.values !== this.props.values) {
      this.setState({
        model: this.props.model,
        values: this.props.values || {}
      })
    }
  }

  onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    this.setState({
      waiting: true
    })

    this.state.model.save(this.state.values)
      .then(model => {
        if (model.error) {
          this.setState({
            model,
            waiting: false
          })
        } else {
          if (this.props.onSubmit) {
            this.props.onSubmit(e, this.state)
          }
          this.setState({ 
            model,
            waiting: false,
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

    set(this.state.values, e.currentTarget.name, value)

    this.setState({
      values : this.state.values
      // invalids : {
      //   ...this.state.invalids,
      //   [e.currentTarget.name]: undefined
      // }
    })
  }

  onInvalid(e: React.InvalidEvent<HTMLInputElement>) {
    e.currentTarget.scrollIntoView(false)

    // this.setState({
    //   invalids : {
    //     ...this.state.invalids,
    //     [e.currentTarget.name]: true
    //   }
    // })
  }

  public render() {
    return <form onSubmit={this.onSubmit.bind(this)} method='POST'>
      
      <FormContext.Provider value={{
          form_id: this.props.id,
          onChange: this.onChange.bind(this),
          onInvalid: this.onInvalid.bind(this),
          values: this.state.values,
          waiting: this.state.waiting,
          errorMessage: this.state.model.error && this.state.model.error.message,
          errorFields: this.state.model.error && this.state.model.error.fields
        }}>
        {this.props.children}
      </FormContext.Provider>

      {this.state.model.error && <div className='alert'>{this.state.model.error.message}</div>}
      <Button submit label={this.state.waiting ? 'One moment...' : this.props.cta || 'Save'} disabled={this.state.waiting} />

      {this.state.success && this.props.redirect !== false && <Redirect push to={this.props.redirect ? this.props.redirect as string : `/${(this.state.model.constructor as typeof Model).endpoint}/${this.state.model._id}`} />}
    </form>
  }
}