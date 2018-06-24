
const Parser = require('html-react-parser')
import * as React from 'react'
import Piece from '../models/piece'


interface Props {
  k: string,
  piece: {
    _id: string,
    [key:string]: any
  }
}
interface State {
  piece: Piece
}

export class P extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props)
    this.state = {
      piece: new Piece({_id: props.piece._id})
    }
  }

  componentDidMount() {
  }

  public render() {
    return Parser(this.props.piece[this.props.k])
  }
}