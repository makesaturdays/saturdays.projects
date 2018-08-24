

import * as React from 'react'

import { Link, RouteComponentProps } from 'react-router-dom'

import Project from '../models/project'
import { Week } from '../components/calendar'


interface Props extends RouteComponentProps<any> {
  context: {
    response: any
  }
}
interface State {
  projects: Project[]
}


export class Home extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props)
    this.state = {
      projects: null
    }
  }
  

  componentDidMount() {
    Project.list().then(projects => this.setState({ projects }))
  }


  public render() {
    return <div className='padded padded--big_top'>
      <div>
        <h1>Make Saturdays</h1>
        {this.state.projects && this.state.projects.map(project => <Link to={`/projects/${project._id}`} key={project._id}>{project.attributes.name}</Link>)}
        <Week />
      </div>
    </div>
  }
}