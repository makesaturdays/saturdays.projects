
import * as React from 'react'
import { Link } from 'react-router-dom';
import { weekday } from '../helpers/formatters';


interface Props {}
interface State {}


export class Footer extends React.Component<Props, State> {

  constructor(props: {}) {
    super(props)
    this.state = {}
  }


  public render() {
    return <footer className='hero hero--fixed highlight_back'>
      <Link to='/projects/new' className='hero__content'>
        <h2 className='text_center'>Are you starting a new project?</h2>
        <h1 className='h1--massive text_center'>Make it next Saturday</h1>
      </Link>
      <nav className='hero__bottom underline_links text_center'>
        It's <strong>{weekday(new Date())}</strong>. Make Saturdays are sourced from <a href=''>these suppliers</a>. Our code is <a href=''>Open Sourced</a>. Our pics are on <a href=''>Instagram</a>. We're also <a href=''>Tweeting</a>.<br />Read the books from our <a href=''>Library</a>. And get to know our thoughts on the <a href=''>Blog</a>.
      </nav>
    </footer>
  }
}