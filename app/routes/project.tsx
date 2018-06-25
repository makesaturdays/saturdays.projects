
import * as React from 'react'
import { context } from '../context'

import { Link, RouteComponentProps } from 'react-router-dom'

import Project from '../models/project'


interface Props extends RouteComponentProps<any> {
  context: {
    response: any
  }
}
interface State {
  project: Project
}


@context
export class ProjectView extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props)
    this.state = {
      project: props.context.response ? new Project(props.context.response) : new Project({_id: props.match.params._id})
    }
  }
  

  componentDidMount() {
    this.state.project.fetch().then(project => this.setState({ project }))
  }


  public render() {
    return <div className='padded padded--big_top'>
      <div>
        {this.state.project && <h1>{this.state.project.attributes.name}</h1>}
      </div>
    </div>
  }
}