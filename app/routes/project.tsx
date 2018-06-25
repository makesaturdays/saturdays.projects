
import * as React from 'react'
import { context } from '../context'

import { Link, RouteComponentProps } from 'react-router-dom'

import Project from '../models/project'
import { Tags } from '../components/tags'


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
      {this.state.project && <div>
        <h1>{this.state.project.attributes.name}</h1>
        <Tags selected={this.state.project.attributes.tags} path='/projects?tagged=' tags={[{key: 'design', title: 'Design'}, {key: 'code', title: 'Code'}]} />
      </div>}
    </div>
  }
}