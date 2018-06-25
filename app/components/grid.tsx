
import * as React from 'react'
interface GridProps {
  guttered?: boolean,
  spaced?: boolean,
  middle?: boolean
}

export const Grid: React.SFC<GridProps> = (props) => {
  return <div className={`grid${props.guttered ? ' grid--guttered' : ''}${props.middle ? ' grid--middle' : ''}${props.spaced ? ' grid--spaced' : ''}`}>{props.children}</div>
}

interface ColProps {
  size?: string
}

export const Col: React.SFC<ColProps> = (props) => {
  return <div className={`col${props.size ? ` col--${props.size}` : ''}`}>{props.children}</div>
}

interface ThirdProps {}

export const Third: React.SFC<ThirdProps> = (props) => {
  return <Col size={`1of3`}>{props.children}</Col>
}

export const Seventh: React.SFC<ThirdProps> = (props) => {
  return <Col size={`1of7`}>{props.children}</Col>
}

export const Quarter: React.SFC<ThirdProps> = (props) => {
  return <Col size={`3of12 col--tablet_portrait--6of12`}>{props.children}</Col>
}

export const Half: React.SFC<ThirdProps> = (props) => {
  return <Col size={`6of12 col--tablet_portrait--12of12`}>{props.children}</Col>
}