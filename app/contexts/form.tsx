import * as React from 'react'

export const FormContext = React.createContext({
  form_id: undefined as string,
  values: {} as { [key:string]: any },
  onChange: function(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | {
    currentTarget: {
      value: any,
      name: string,
      type?: string,
      checked?: boolean
    }
  }): void {},
  onInvalid: function(e: React.InvalidEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | {
    currentTarget: {
      value: any,
      name: string,
      type?: string,
      checked?: boolean
    }
  }): void {},
  errorMessage: undefined as string,
  errorFields: undefined as {[name:string]: any},
  waiting: false as boolean
})


export interface FormContextProps {
  context? : {
    values: { [key:string]: any },
    onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | {
      currentTarget: {
        value: any,
        name: string,
        type?: string,
        checked?: boolean
      }
    })=> void
  }
}

export function withFormContext<T extends React.ComponentClass>(Component: T): T {
  return ((props: any)=> <FormContext.Consumer>{context => <Component {...props} context={context} />}</FormContext.Consumer>) as any as T
}