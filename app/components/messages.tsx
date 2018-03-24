
import * as React from "react"

import { TextField } from "./textfield"

interface MessageProps {
  _id?: string,
  body: string,
  username: string,
  created_at?: string,
  current?: boolean
}

interface Props {}
interface State {
  sender_id: string,
  messages: MessageProps[],
  body: string,
  username: string
}

export const Message: React.SFC<MessageProps> = (props) => {
  return <li className={`message${props.current ? " message--current" : ""}`}>
    {props.username && <div className="small_top"><small>{props.username.split("@")[0]}</small></div>}
    <span className="message__content">{props.body}</span>
  </li>
}

export default class Messages extends React.Component<Props, State> {

  private socket : WebSocket
  private element : HTMLElement

  constructor(props: {}) {
    super(props)
    this.state = {
      sender_id: undefined,
      messages: [],
      body: "",
      username: localStorage.getItem("username") || undefined
    }
  }

  componentDidMount() {
    this.socket = new WebSocket("wss://messenger.unsplashxmalboeuf.net")

    this.socket.onmessage = (e)=> {
      let data = JSON.parse(e.data)
      this.setState({
        messages: [...this.state.messages, ...(data.messages ? data.messages : [data.message])]
      })
    }

    this.scrollToBottom()
  }

  componentWillUnmount() {
    this.socket.close()
  }

  componentDidUpdate() {
    this.scrollToBottom()
  }

  private submitUsername(e: React.FormEvent<HTMLFormElement>) : void {
    e.preventDefault()
    localStorage.setItem("username", e.currentTarget.username.value)
    this.setState({username: e.currentTarget.username.value})
  }

  private resetUsername() : void {
    localStorage.removeItem("username")
    this.setState({username: undefined})
  }

  private sendMessage(e: React.FormEvent<HTMLFormElement>) : void {
    e.preventDefault()
    this.socket.send(JSON.stringify({body: e.currentTarget.body.value, username: this.state.username}))
    this.setState({body: ""})
  }

  private scrollToBottom() : void {
    if (this.element) {
      this.element.scrollTop = this.element.scrollHeight
    }
  }

  public render() {
    return this.state.username
      ? [
        <div className="messages_container" key="messages">
          <ol ref={(element) => this.element = element} className="messages">
            {this.state.messages.map((message, index)=> <Message key={message._id} 
              body={message.body}
              username={index > 0 && this.state.messages[index-1].username != message.username ? message.username : undefined}
              current={this.state.username === message.username} />)}
          </ol>
        </div>,
        <form className="normal_bottom" key='form' onSubmit={(e)=> this.sendMessage(e)}>
          <TextField name="body" placeholder="Say hi!"
            value={this.state.body}
            autoFocus={true}
            autoComplete="off"
            onChange={(e)=> this.setState({body: e.currentTarget.value})} />
          <button type="submit">Send</button>
        </form>,
        <button key="reset_username" className="button--transparent button--small" onClick={(e)=> this.resetUsername()}>Not {this.state.username}?</button>
      ]
      : <form onSubmit={(e)=> this.submitUsername(e)}>
          <TextField name="username" label="Provide a username, just to identify yourself"
            value={this.state.username}
            placeholder="unsplashdev" />
          <button type="submit">Save</button>
        </form>
  }
}