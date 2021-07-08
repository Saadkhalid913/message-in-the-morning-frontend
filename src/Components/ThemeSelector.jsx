import React, { Component } from 'react'

export default class Themeselector extends Component {
    state = {CurrentTheme : this.props.colors[0]}
    render() {
        const { colors } = this.props;
        return (
            <div className ="theme-selector">
                {colors.map(c => <div 
                                    key={c["name"]}
                                    onClick = {() => {this.changeTheme(c)}}
                                    style={{backgroundColor: c["--message-background"]}}
                                    className = {(c["name"] === this.state.CurrentTheme["name"]) ? "color-option-selected" : "color-option"}>
                                    </div>)}
            </div>
        )
    }
    changeTheme(c) {
        for (let key in c)
            document.documentElement.style.setProperty(key, c[key])
        this.setState({CurrentTheme : c})
    }

}



