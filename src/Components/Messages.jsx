import React, { Component } from 'react'
import Message from "./Message"
import axios from "axios"
import Themeselector from "./ThemeSelector"
import themes from "./themes"


export default class Messages extends Component {
    state = {
        messages: []
    }
    componentDidMount() {
        this.getMessages()
    }
    render() {
        if (this.state.messages.length === 0) {
            return (<h1>No messages for today!</h1>)
        }
        return (
            <div className = "rendered-wrapper">
            <Themeselector colors = {themes}/>
            <div className="messages-wrapper">
                {this.state.messages.map(m => <Message key={m.title + Date.now()} message={m}/>)}
            </div>
            </div>
        )
    }
    
    getMessages = async () => {
        const { token } = this.props
        const response = await axios.get("http://localhost:3001/api/messages/recent", {headers: {user_auth_token: token}})
        if (response.error) return alert(response.error)
        this.setState({messages : response.data})
    }

}