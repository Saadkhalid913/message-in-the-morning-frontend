import React, { Component } from 'react'


const Message = (props) => {
    const { message } = props

    return ( 
        <div className = "message">
            <h2>{message.title}</h2>
            <p className = "message-body">{message.body}</p>
            <p className = "message-time-remaining">{getTimeRemainingString(message)}</p>
            <button className ="message-delete" onClick={() =>{props.handleDelete(message)}}>Delete</button>
        </div>
    );
}


function getTimeRemainingString(message) {
    const timeCreated = new Date(message.timeCreated).valueOf();
    const millisecondsInMinute = 1000 * 60
    const millisecondsInHour = 1000 * 60 * 60 
    const MillisecondsInDay = millisecondsInHour * 24
    
    const elapsedMilliseconds = Date.now() - timeCreated
    const elapsedMinutes = Math.floor( elapsedMilliseconds / millisecondsInMinute)

    if (elapsedMinutes < 60) return `${elapsedMinutes}m ago`
    const elapsedHours =  Math.floor(elapsedMinutes / 60)
    return `${elapsedHours}h ago`

}   

export default Message;
