import React, { Component } from 'react'
import NoToken from "./Notoken"
import Messages from "./Messages"
import Themeselector from "./ThemeSelector"
export default class App extends Component {
    state = {
        token: undefined
    }
    componentDidMount() {
        this.setState({token: localStorage.getItem("user_auth_token")})
    }


    render() {
        if (!this.state.token) {
            return (<NoToken />)
        }
        return (
            <Messages token={this.state.token} />
        )
        
    }
}