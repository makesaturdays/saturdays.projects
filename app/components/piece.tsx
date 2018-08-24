
import Parser from 'html-react-parser'
import * as React from 'react'

import Piece from '../models/piece'
import { Button } from './button'
import { AppContextProps, withContext } from '../contexts/app'


interface Props {
  r: string,
  k: string,
  className?: string
}

interface State {
  value?: any
}

@withContext
export class P extends React.Component<Props & AppContextProps, State> {

  public piece: Piece

  constructor(props: Props) {
    super(props)
    this.state = {
    }
    
    this.piece = new Piece({_id: this.props.context.pieces[this.props.r]._id})
  }

  componentDidMount() {
  }

  protected input(e: React.FormEvent<HTMLSpanElement>) {
    this.setState({
      value: e.currentTarget.innerHTML
    })
  }

  protected save(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault()
    this.piece.save({
      content: {
        [this.props.k]: this.state.value
      }
    })
      .then(piece => this.setState({ 
        value: undefined
      }))
  }

  public render() {
    return this.props.context.editable
      ? <>
        <span contentEditable suppressContentEditableWarning onInput={e => this.input(e)} onClick={e => e.preventDefault()}>{Parser(this.props.context.pieces[this.props.r][this.props.k])}</span>
        <Button disabled={this.state.value === undefined} label='Save' onClick={e => this.save(e)} />
      </>
      : Parser(this.props.context.pieces[this.props.r][this.props.k])
  }
}