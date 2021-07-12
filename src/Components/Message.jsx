import React, { Component } from 'react'


const Message = (props) => {
    const { message } = props

    return ( 
        <div className = "message">
            <h2>{message.title}</h2>
            <p>{message.body}</p>
        </div>
    );
}

export default Message;
