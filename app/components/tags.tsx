

// import * as React from 'react'
// import { Grid, Seventh } from './grid'
// import { Input } from './input'
// import { Link } from 'react-router-dom';


// interface Props {
//   tags: {key: string, title: string}[],
//   path?: string,
//   editable?: boolean,
//   name?: string,
//   selected?: string[]
//   onChange?: (e: React.ChangeEvent | {currentTarget: {name: string, type: string, value: any}}) => void
// }
// interface State {
//   selected: {[key:string]: boolean}
// }

// export class Tags extends React.Component<Props, State> {

//   constructor(props: Props) {
//     super(props)
//     this.state = {
//       selected: undefined
//     }
//   }

//   static getDerivedStateFromProps(props: Props, state: State) {
//     return {selected: props.selected ? props.selected.reduce((tags: {[tag: string]: boolean}, tag) => {
//       tags[tag] = true
//       return tags
//     }, {}) : {}}
//   }

  

//   onChange(e) {
//     this.state.selected[e.currentTarget.name.split(':')[1]] = e.currentTarget.checked

//     this.props.onChange({currentTarget: {
//       name: this.props.name,
//       type: 'tags',
//       value: Object.keys(this.state.selected).filter((key) => this.state.selected[key]).map((key) => key)
//     }})

//     this.setState({
//       selected: this.state.selected
//     })
//   }


//   public render() {
//     return <div className='tags'>
//       {this.props.tags.map(tag => <span key={tag.key} className='tag'>
//         {!this.props.editable
//         ? <Link to={`${this.props.path}${tag.key}`}>{tag.title}</Link>
//         : <Input name={`${this.props.name}:${tag.key}`}
//           type='checkbox'
//           label={tag.title}
//           checked={this.state.selected[tag.key] ? true : false}
//           onChange={(e)=> this.onChange(e)} />
//         }
//       </span>)}
//     </div>
//   }
// }