

import * as React from 'react'
import { Grid, Seventh } from './grid';
import { weekday, month } from '../helpers/formatters'
import { Button } from './button'

interface Props {
  
}
interface State {
  now: Date,
  start: Date
}

export class Week extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props)
    this.state = {
      now: new Date(),
      start: new Date()
    }

    this.state.start.setDate(this.state.now.getDate() - this.state.now.getDay() - 4)
    this.state.start.setHours(0)
		this.state.start.setMinutes(0)
		this.state.start.setSeconds(0)
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
    let today = new Date(this.state.now)
		today.setHours(0)
		today.setMinutes(0)
    today.setSeconds(0)

    // let end = new Date(this.state.start)
    // end.setDate(this.state.start.getDate() + 7)

    let dates = new Array(7).fill(null).map((value, index: number)=> {
      let d = new Date(this.state.start)
      d.setDate(this.state.start.getDate() + index)
      return d
    })
    
    return <Grid>

      <Grid spaced>
        <Button onClick={()=> this.backward()} label='❮' />

        <span>{month(dates[0])} {dates[0].getDate()} <em>to</em> {month(dates[dates.length - 1])} {dates[dates.length - 1].getDate()} <span>{dates[dates.length - 1].getFullYear()}</span></span>

        <Button onClick={()=> this.forward()} label='❯' />
      </Grid>

      {dates.map((date, index)=> <Seventh key={date.getTime()}>
        {index < 7 &&
				<Grid spaced>
          <span></span>
					<small>{weekday(date)}</small>
          <small>{date.getDate()}</small>
				</Grid>
				||
				<small>{date.getDate()}</small>
				}
      </Seventh>)}
    </Grid>
  }
}