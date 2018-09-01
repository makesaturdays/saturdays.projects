

import * as React from 'react'

import Event from '../models/event'

import { Grid, Seventh } from './grid'
import { weekday, month } from '../helpers/formatters'
import { Button } from './button'
import { RRule } from 'rrule'


interface Props {
  events?: Event[]
}

interface State {
  now: Date,
  today: Date,
  start: Date
}

export class Month extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props)
    this.state = {
      now: new Date(),
      start: new Date(),
      today: new Date()
    }

    this.state.start.setDate(1)
    this.state.start.setHours(0)
		this.state.start.setMinutes(0)
		this.state.start.setSeconds(0)
    this.state.start.setMilliseconds(0)

		this.state.today.setHours(0)
		this.state.today.setMinutes(0)
    this.state.today.setSeconds(0)
    this.state.today.setMilliseconds(0)
  }

  public backward() {
    this.state.start.setMonth(this.state.start.getMonth() - 1)
    this.setState({ start: this.state.start })
  }

  public forward() {
    this.state.start.setMonth(this.state.start.getMonth() + 1)
    this.setState({ start: this.state.start })
  }

  public render() {

    let dates = new Array(new Date(this.state.start.getFullYear(), this.state.start.getMonth()+1, 0).getDate()).fill(null).map((value, index: number)=> {
      let d = new Date(this.state.start)
      d.setDate(this.state.start.getDate() + index)
      return d
    })
    
    return <Grid>
      
      <Grid spaced>
        <Button onClick={()=> this.backward()} label='❮' />
        <span>{month(this.state.start)} {this.state.start.getFullYear()}</span>
        <Button onClick={()=> this.forward()} label='❯' />
      </Grid>

      {new Array(this.state.start.getDay()).fill(null).map((value, index)=> <Seventh key={index} />)}
      {dates.map((date, index)=> <Day key={index} date={date} now={this.state.now} isToday={date.getTime() === this.state.today.getTime()} showWeekday={index < 7} />)}
    </Grid>
  }
}

export class Week extends Month {

  constructor(props: Props) {
    super(props)

    this.state.start.setDate(this.state.now.getDate() - this.state.now.getDay())
  }

  public backward() {
    this.state.start.setDate(this.state.start.getDate() - 7)
    this.setState({ start: this.state.start })
  }

  public forward() {
    this.state.start.setDate(this.state.start.getDate() + 7)
    this.setState({ start: this.state.start })
  }

  public render() {

    let dates = new Array(7).fill(null).map((value, index: number)=> {
      let d = new Date(this.state.start)
      d.setDate(this.state.start.getDate() + index)

      let midnight = new Date(d)
      midnight.setHours(24)

      return {
        d,
        events: this.props.events && [
          ...this.props.events.filter(event => event.attributes.date.getTime() === d.getTime()),
          ...this.props.events.reduce((recurring_events: Event[], event)=> {
            return event.attributes.recurrence_rule 
              ? recurring_events.concat((event.attributes.recurrence_rule as RRule).between(d, midnight)
                .map(date => new Event({ ...event.attributes, starts_at: date })))
              : recurring_events
          }, [])
        ]
      }
    })
    
    return <Grid>
      
      <Grid spaced>
        <Button onClick={()=> this.backward()} label='❮' />
        <span>{month(dates[0].d)} {dates[0].d.getDate()} <em>to</em> {month(dates[dates.length - 1].d)} {dates[dates.length - 1].d.getDate()} <span>{dates[dates.length - 1].d.getFullYear()}</span></span>
        <Button onClick={()=> this.forward()} label='❯' />
      </Grid>

      {dates.map((date, index)=> <Day key={index} date={date.d} events={date.events} now={this.state.now} isToday={date.d.getTime() === this.state.today.getTime()} showWeekday={index < 7} />)}
    </Grid>
  }
}



interface DayProps {
  date: Date,
  now: Date,
  events?: Event[]
  isToday?: boolean,
  showWeekday?: boolean
}

export const Day: React.SFC<DayProps> = props => {
  return <Seventh>
    <div className={`day${props.date.getDay() == 0 || props.date.getDay() == 6 ? ' day--weekend' : ''}${props.isToday ? ' day--today' : ''}`}>
      <Grid spaced>
        <span></span>
        {props.showWeekday && <small>{weekday(props.date)}</small>}
        <small>{props.date.getDate()}</small>
      </Grid>

      {props.isToday && <div className='day__now' style={{
        top: `${(props.now.getTime() - props.date.getTime()) / 86400000 * 100}%`
      }} />}

      {props.events && props.events.map(event => <div key={event._id} className='day__event' style={{
        top: `${(event.attributes.starts_at.getTime() - props.date.getTime()) / 86400000 * 100}%`,
        height: `${event.attributes.length_in_hours * 3600000 / 86400000 * 100}%`
      }}>
        {/* {event.attributes.starts_at.toTimeString()} */}
      </div>)}
    </div>
  </Seventh>
}