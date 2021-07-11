import React, { Component } from 'react'
import Message from "./Message"
import axios from "axios"
import Themeselector from "./ThemeSelector"
import themes from "./themes"


export default class Messages extends Component {
    state = {
        messages: [],
        current_theme: null
    }



    async componentDidMount() {
        this.getMessages()
        await this.initTheme()
        this.changeTheme(this.state.current_theme)
    }
    render() {
        if (this.state.messages.length === 0) {
            return (<h1>No messages for today!</h1>)
        }

        return (
            <div className = "rendered-wrapper">
            <Themeselector colors = {themes} 
                            CurrentTheme = {this.state.current_theme}
                            changeTheme={this.changeTheme}/>
            <div className="messages-wrapper">
                <h3>You have {this.state.messages.length} Messages</h3>
                {this.state.messages.map(m => <Message key={m.title + Date.now()} message={m}/>)}
            </div>
            </div>
        )
    }
    
    getMessages = async () => {
        const { token } = this.props
        const response = await axios.get("http://localhost:3001/api/messages", {headers: {user_auth_token: token}})
        if (response.data.error) return console.log(response.data.error)
        this.setState({messages : response.data})
    }

    changeTheme = (t) => {
        for (let key in t)
            document.documentElement.style.setProperty(key, t[key])
        localStorage.setItem("CurrentTheme", JSON.stringify(t))
        this.setState({current_theme: t})
    }

    initTheme = () => {
        if (localStorage.getItem("CurrentTheme") != null) {
            console.log(1)
            this.setState({current_theme: JSON.parse(localStorage.getItem("CurrentTheme"))})
        }
        else {
            console.log(2)
            this.setState({current_theme: themes[0]})
        }
        console.log("Setting theme to: ", this.state.current_theme)

    }

}