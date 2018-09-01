

import * as React from 'react'

import { Link, RouteComponentProps } from 'react-router-dom'

import Project from '../models/project'
import Event from '../models/event'

import { Week, Month } from '../components/calendar'
import { Form } from '../components/form'
import { Input } from '../components/input'



interface Props extends RouteComponentProps<any> {
  context: {
    response: any
  }
}
interface State {
  projects: Project[],
  events: Event[]
}


export class Home extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props)
    this.state = {
      projects: null,
      events: null
    }
  }
  

  componentDidMount() {
    Project.list().then(projects => this.setState({ projects }))
    Event.list().then(events => this.setState({ events }))
  }


  public render() {
    return <div className='padded padded--big_top'>
      <div>
        <h1>Make Saturdays</h1>
        {this.state.projects && this.state.projects.map(project => <Link to={`/projects/${project._id}`} key={project._id}>{project.attributes.name}</Link>)}
        <Week events={this.state.events} />
        <Form id='create_event' model={new Event()} cta='Create'>
          <Input label='Event name' name='name' />
          <Input type='textarea' label='Description' name='description' optional />
          <Input type='datetime-local' label='Starts at' name='starts_at' />
          <Input type='number' label='Event length in hours' name='length_in_hours' />
        </Form>
        {/* <Month /> */}
      </div>
    </div>
  }
}