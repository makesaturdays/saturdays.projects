
import * as React from 'react'
import { Link, RouteComponentProps } from 'react-router-dom'

import { Form } from '../components/form'
import { Input } from '../components/input'

import Project from '../models/project'


interface Props extends RouteComponentProps<any> {}
interface State {
  project: Project
}

export class NewProjectView extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props)
    this.state = {
      project: new Project()
    }
  }

  componentDidMount() {
  }


  public render() {
    return <div className='padded padded--big_top'>
      <div className=''>
        <Form id='create_project' model={this.state.project} cta='Create'>
          <Input label='Project name' name='name' />
          <Input type='textarea' label='Description' name='description' />
          {/* <Input type='tags' label='Tags' name='tags' tags={[{key: 'design', title: 'Design'}, {key: 'code', title: 'Code'}]} /> */}
        </Form>
      </div>
    </div>
  }
}



