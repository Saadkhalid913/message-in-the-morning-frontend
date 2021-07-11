import React, { Component } from 'react'

export default class Themeselector extends Component {
    render() {
        const { colors } = this.props;
        if (!this.props.CurrentTheme) return null
        return (
            <div className ="theme-selector">
                {colors.map(c => <div 
                                    key={c["name"]}
                                    onClick = {() => {this.props.changeTheme(c)}}
                                    style={{backgroundColor: c["--message-background"]}}
                                    className = {(c["name"] === this.props.CurrentTheme["name"]) ? "color-option-selected" : "color-option"}>
                                    </div>)}
            </div>
        )
    }
    

}



