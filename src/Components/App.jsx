import React, { Component } from 'react'
import NoToken from "./Notoken"
import Messages from "./Messages"
import Themeselector from "./ThemeSelector"
import themes from "./themes"
import ThemeSelector from './ThemeSelector'
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
        <div className = "main-wrapper">
            <ThemeSelector colors ={themes}/>
            <Messages token={this.state.token} />
        </div>
        )
        
    }
}