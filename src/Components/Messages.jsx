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
            return (<h1 className = "main-user-message">No messages for today!</h1>)
        }

        return (
            <div className = "rendered-wrapper">
            <Themeselector colors = {themes} 
                            CurrentTheme = {this.state.current_theme}
                            changeTheme={this.changeTheme}/>
            <div className="messages-wrapper">
                {this.state.messages.map(m => <Message key={m.title + Date.now()} message={m}/>)}
            </div>
            </div>
        )
    }
    
    getMessages = async () => {
        const { token } = this.props
        const response = await axios.get("https://mitm-api.herokuapp.com/api/messages/recent", {headers: {user_auth_token: token}})
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
            this.setState({current_theme: JSON.parse(localStorage.getItem("CurrentTheme"))})
        }
        else {
            this.setState({current_theme: themes[0]})
        }

    }

}